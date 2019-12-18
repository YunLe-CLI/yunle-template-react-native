import {Platform} from "react-native";
import request from '@/utils/request'
import { getOrigin } from '@/utils/utils'
import {BUILD_TYPE, ENVIRONMENT} from "@/utils/env";
/**
 * 获取app版本
 * api doc url:
 * @param params
 */
export async function getOnlineAppVersion(): Promise<any> {
  const url = `https://dagouzhi.oss-cn-qingdao.aliyuncs.com/com.dagouzhi.app.temp/${Platform.OS}/${ENVIRONMENT || 'production'}/${BUILD_TYPE || 'release'}/app_version_info_${Platform.OS}.json`;
  console.log(url)
  return request(await getOrigin(url, 'app'), {
    method: 'GET',
  });
}
