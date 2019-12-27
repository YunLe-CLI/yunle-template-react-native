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
    app_platform: 'android' | 'ios' | string;
    app_version: string; // '0.0.8'
    app_build_number: number | string; // 1
  };
  const appInfo: IAppInfo = {
    app_platform: Platform.OS,
    app_version: DeviceInfo.getVersion(),
    app_build_number: DeviceInfo.getBuildNumber(),
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
