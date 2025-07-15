import axios, { type AxiosResponse } from 'axios';
import { type ResponseData } from './types';
import { message } from 'antd';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
//  请求拦截器
http.interceptors.request.use(
  (config) => {
    // 添加token
    const storage = localStorage.getItem('user-storage')? JSON.parse(localStorage.getItem('user-storage') || '') : null;
    const token = storage?.state?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // 处理错误码
    // 处理token
    const token = response.headers.authorization;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  },
  (error) => {

    // 处理错误码
    if (error.response.status === 401) {
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    } else if (error.response.status === 403) {
      message.error('无权限访问');
    } else if (error.response.status === 404) {
      message.error('请求资源不存在');
    } else if (error.response.status === 500) {
      message.error('服务器错误');
    } else {
      message.error('请求失败');
    }
    return Promise.reject(error);
  }
);

export default http;