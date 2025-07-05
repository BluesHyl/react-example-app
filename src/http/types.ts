// 请求配置接口扩展
export interface RequestOptions {
  // 是否显示loading
  showLoading?: boolean;
  // 是否显示错误信息
  showError?: boolean;
  // 自定义错误信息
  errorMessage?: string;
  // 是否开启缓存
  enableCache?: boolean;
  // 缓存时间(ms)
  cacheTime?: number;
  // 重试次数
  retryCount?: number;
  // 重试延迟(ms)
  retryDelay?: number;
}

// 后端响应数据结构
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 请求方法
export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// 请求参数
export interface RequestParams {
  [key: string]: any;
} 