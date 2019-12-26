import {Platform} from "react-native";
import request from '@/utils/request'
import { getOrigin } from '@/utils/utils'
import {ENVIRONMENT} from "@/utils/env";
import _ from 'lodash';

/**
 * 获取app版本
 * api doc url:
 * @param params
 */
export async function getOnlineAppVersion(): Promise<any> {
  const url = `https://dagouzhi.oss-cn-qingdao.aliyuncs.com/com.dagouzhi.app.temp/app.version.update.info.json`;
  return request(await getOrigin(url, 'app'), {
    method: 'GET',
  }).then((data = {}) => {
    const res = _.get(data, `${Platform.OS}.${ENVIRONMENT}`, {}) || {};
    return res
  });
}
