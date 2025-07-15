import http from './index';
import { type RequestParams } from './types';

export const get = (url: string, params: RequestParams) => {
  return http.get(url, { params });
};

export const post = (url: string, data: RequestParams) => {
  return http.post(url, data);
};
export const put = (url: string, data: RequestParams) => {
  return http.put(url, data);
};
export const del = (url: string, params: RequestParams) => {
  return http.delete(url, { params });
};
export const patch = (url: string, data: RequestParams) => {
  return http.patch(url, data);
};
export const request = (url: string, params: RequestParams, options: any = {}) => {
  return http.request({ url, params, ...options });
};
