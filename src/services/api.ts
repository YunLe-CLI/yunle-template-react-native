import {Platform} from 'react-native';
import request from '@/utils/request'
import { getOrigin } from '@/utils/utils'
/**
 * 获取app版本
 * api doc url:
 * @param params
 */
export async function getAppVersion(): Promise<any> {
  const os = Platform.OS;
  let query = 0;
  if (os === 'android') {
    query = 1;
  }
  if (os === 'ios') {
    query = 2;
  }
  return request(await getOrigin(`/?query=${query}`, 'app'), {
    method: 'GET',
  });
}
