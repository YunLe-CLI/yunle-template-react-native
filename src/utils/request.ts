import fetch from 'isomorphic-fetch';
import { getToken } from '@/utils/utils';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
 * @param url
 * @param option
 */
export default async function request(url: string, option: any): Promise<any> {
  const token = await getToken();
  interface IAppInfo {
    appPlatform: 'android' | 'ios' | string;
    appVersion: string; // '0.0.8'
    appBuildNumber: number | string; // 1
  };
  const appInfo: IAppInfo = {
    appPlatform: Platform.OS,
    appVersion: DeviceInfo.getVersion(),
    appBuildNumber: DeviceInfo.getBuildNumber(),
  };
  const response = await fetch(url, {
    ...option,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: option.token || token,
      ...appInfo,
    }
  }).catch((err: any) => {
    console.log(err)
    return err;
  });
  let jsonData = {};
  try {
    jsonData = response.json();
  } catch (e) {

  }
  return jsonData;
}
