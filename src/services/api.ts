import {Platform} from "react-native";
import request from '@/services/request'
import _ from 'lodash';
import moment from "moment";

export interface VERSION_INFO {
  "version": string;
  "build": string;
  "download": string;
}

export interface VERSION_LIST {
  "qa": VERSION_INFO;
  "debug": VERSION_INFO;
  "production": VERSION_INFO;
}

export interface onlineVersion {
  "ios": VERSION_LIST;
  "android": VERSION_LIST;
} 

/**
 * 获取app版本
 * api doc url:
 * @param params
 */
export async function getOnlineAppVersion(): Promise<VERSION_INFO> {
  const url = `https://dagouzhi.oss-cn-qingdao.aliyuncs.com/com.dagouzhi.app.temp/app.version.update.info.json?time=${moment().format("X")}`;
  return request({
    url: url,
    method: 'GET'
  }).then(({ data }: { data: onlineVersion }) => {
    const res = _.get(data, `${Platform.OS}.${$config.environment}`, {}) || {};
    console.log(3333, data, res, `${Platform.OS}.${$config.environment}`)
    return res
  }).catch((err) => {
    console.log(3333, err)
  });
}
