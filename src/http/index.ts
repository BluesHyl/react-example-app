import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosResponse, type Canceler } from 'axios';
import { message } from 'antd';
import { type RequestOptions, type ResponseData, type RequestMethod, type RequestParams } from './types';

// 取消请求Map
const pendingMap = new Map<string, Canceler>();
// 简易缓存Map
const cacheMap = new Map<string, { data: any; expire: number }>();

/**
 * 生成请求Key
 */
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { url, method, params, data } = config;
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
};

/**
 * 添加请求到pendingMap中
 */
const addPending = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pendingMap.has(requestKey)) {
      pendingMap.set(requestKey, cancel);
    }
  });
};

/**
 * 移除请求从pendingMap中
 */
const removePending = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config);
  if (pendingMap.has(requestKey)) {
    const cancel = pendingMap.get(requestKey);
    cancel && cancel('请求被取消');
    pendingMap.delete(requestKey);
  }
};

// 创建axios实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 检查是否有重复请求需要取消
    removePending(config);
    // 将当前请求添加到pendingMap
    addPending(config);
    
    // 添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    // 自定义请求头
    const customOptions = config.customOptions as RequestOptions;
    if (customOptions?.showLoading) {
      // 可以添加全局loading
      // loading.show();
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 移除已完成的请求
    removePending(response.config);
    
    const customOptions = response.config.customOptions as RequestOptions;
    if (customOptions?.showLoading) {
      // 关闭loading
      // loading.hide();
    }
    
    // 根据后端约定的状态码进行判断
    const res = response.data as ResponseData;
    if (res.success || res.code === 200) {
      return res.data;
    } else {
      // 处理业务错误
      if (customOptions?.showError !== false) {
        message.error(customOptions?.errorMessage || res.message || '请求失败');
      }
      
      // 处理特定错误码
      if (res.code === 401) {
        // 未登录或token过期
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(res.message || '请求失败'));
    }
  },
  error => {
    // 移除已完成的请求
    error.config && removePending(error.config);
    
    const customOptions = error.config?.customOptions as RequestOptions;
    if (customOptions?.showLoading) {
      // 关闭loading
      // loading.hide();
    }
    
    // 处理请求取消
    if (axios.isCancel(error)) {
      console.log('请求被取消:', error.message);
      return Promise.reject(error);
    }
    
    // 请求超时
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      message.error('请求超时，请重试');
    }
    
    // 处理HTTP错误状态码
    const status = error.response?.status;
    switch (status) {
      case 400:
        message.error('请求参数错误');
        break;
      case 401:
        message.error('未授权，请重新登录');
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        message.error('拒绝访问');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
        message.error('服务器错误');
        break;
      default:
        message.error(error.response?.data?.message || '网络异常，请重试');
    }
    
    return Promise.reject(error);
  }
);

/**
 * 核心请求函数
 * @param method 请求方法
 * @param url 请求地址
 * @param data 请求数据
 * @param options 请求选项
 * @returns Promise
 */
const request = async <T = any>(
  method: RequestMethod,
  url: string,
  data?: RequestParams,
  options?: RequestOptions & AxiosRequestConfig
): Promise<T> => {
  const { enableCache, cacheTime = 5 * 60 * 1000, ...rest } = options || {};
  
  // 处理请求参数
  const requestData = ['get', 'delete'].includes(method) ? { params: data } : { data };
  
  // 生成缓存Key
  const cacheKey = enableCache ? generateRequestKey({ url, method, ...(requestData as any) }) : '';
  
  // 检查缓存
  if (enableCache && cacheMap.has(cacheKey)) {
    const cache = cacheMap.get(cacheKey);
    if (cache && cache.expire > Date.now()) {
      return Promise.resolve(cache.data);
    } else {
      cacheMap.delete(cacheKey);
    }
  }
  
  try {
    const response = await http.request<any, T>({
      url,
      method,
      ...requestData,
      ...rest,
      customOptions: options,
    });
    
    // 设置缓存
    if (enableCache && response) {
      cacheMap.set(cacheKey, {
        data: response,
        expire: Date.now() + cacheTime,
      });
    }
    
    return response;
  } catch (error: any) {
    // 请求重试
    const retryCount = options?.retryCount || 0;
    const retryDelay = options?.retryDelay || 1000;
    
    if (retryCount > 0 && !axios.isCancel(error)) {
      // 延迟重试
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return request<T>(method, url, data, {
        ...options,
        retryCount: retryCount - 1,
      });
    }
    
    return Promise.reject(error);
  }
};

/**
 * 封装各种请求方法
 */
const api = {
  get: <T = any>(url: string, params?: RequestParams, options?: RequestOptions & AxiosRequestConfig) =>
    request<T>('get', url, params, options),
  post: <T = any>(url: string, data?: RequestParams, options?: RequestOptions & AxiosRequestConfig) =>
    request<T>('post', url, data, options),
  put: <T = any>(url: string, data?: RequestParams, options?: RequestOptions & AxiosRequestConfig) =>
    request<T>('put', url, data, options),
  delete: <T = any>(url: string, params?: RequestParams, options?: RequestOptions & AxiosRequestConfig) =>
    request<T>('delete', url, params, options),
  patch: <T = any>(url: string, data?: RequestParams, options?: RequestOptions & AxiosRequestConfig) =>
    request<T>('patch', url, data, options),
  
  // 批量取消请求
  cancelAll: () => {
    pendingMap.forEach(cancel => {
      cancel('取消所有请求');
    });
    pendingMap.clear();
  },
  
  // 清除缓存
  clearCache: () => {
    cacheMap.clear();
  }
};

export default api;
