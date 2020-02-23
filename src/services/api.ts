import {Platform} from "react-native";
import request from '@Global/utils/request'
import {ENVIRONMENT} from "@Global/utils/env";
import _ from 'lodash';
import moment from "moment";

/**
 * 获取app版本
 * api doc url:
 * @param params
 */
export async function getOnlineAppVersion(): Promise<any> {
  const url = `https://dagouzhi.oss-cn-qingdao.aliyuncs.com/com.dagouzhi.app.temp/app.version.update.info.json?time=${moment().format("X")}`;
  return request({
    url: url,
    method: 'GET'
  }).then((data = {}) => {

    const res = _.get(data, `${Platform.OS}.${ENVIRONMENT}`, {}) || {};
    return res
  });
}
