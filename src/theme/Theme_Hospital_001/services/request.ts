import axios, {AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { store } from '@/index';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 退出登录
  console.log('global.dvaStore', global.dvaStore)
  if (_.get(response, 'code') === -1 && _.isFunction(_.get(global, 'dvaStore.dispatch'))) {
    global.dvaStore.dispatch({
      type: 'auth/logout'
    });
  }
  console.log(11111, response)
  return response || {};
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
    const allState = await global.dvaStore.getState();
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
// 1:yktdemo
  // 2:ktdemo
  // 3:ykt
  // 4:xxkt
  // 5:zxkt
  // 6:jykt
  axios.defaults.headers.common['x-app-name'] = 'yiliao2';
  return axios(config);
}
