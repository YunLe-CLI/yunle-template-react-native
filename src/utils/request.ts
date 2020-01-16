import axios, {AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { store } from '@/index';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('response: ', response)
// 退出登录
  if (_.get(response, 'data.code') === -1 && store.dispatch) {
    store.dispatch({
      type: 'auth/logout'
    });
    // 退出登录
    if (_.get(response, 'data.code') === -1 && store.dispatch) {
      store.dispatch({
        type: 'auth/logout'
      });
    }
  }
  return response.data || {};
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


/**
 * @param url
 * @param option
 */
export default async function request(config: AxiosRequestConfig, token?: string | undefined): Promise<any> {
  let AUTH_TOKEN = undefined;
  try {
    const allState = await store.getState();
    AUTH_TOKEN = token || _.get(allState, 'auth.token');
  } catch (e) {
    AUTH_TOKEN = token || undefined;
  }
  interface IAppInfo {
    app_platform: 'android' | 'ios' | string;
    app_version: string; // '0.0.8'
    app_build_number: number | string; // 1
  };
  const appInfo: IAppInfo = {
    app_platform: Platform.OS,
    app_version: DeviceInfo.getVersion(),
    app_build_number: DeviceInfo.getBuildNumber(),
  };
  // axios.defaults.baseURL = 'https://api.example.com';
  axios.defaults.headers.common['token'] = AUTH_TOKEN;
  axios.defaults.headers.common['AppInfo'] = appInfo;
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

  return axios(config);
}
