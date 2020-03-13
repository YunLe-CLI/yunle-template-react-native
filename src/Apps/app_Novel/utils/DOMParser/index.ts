import axios, {AxiosRequestConfig} from 'axios';
import _ from 'lodash';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response || '';
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


/**
 * @param url
 * @param option
 */
export default async function request(config: AxiosRequestConfig): Promise<any> {
  const html = await axios(config);
  return html.data;
}
