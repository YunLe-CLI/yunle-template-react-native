import {Platform} from "react-native";
import request from '../utils/request'
import {ENVIRONMENT} from "@Global/utils/env";
import _ from 'lodash';
import moment from "moment";

/**
 * 获取app版本
 * api doc url:
 * @param params
 */
export async function getUsers(): Promise<any> {
  const url = `/users`;
  return request({
    url: url,
    method: 'GET'
  }).then((data = {}) => {
    return data
  });
}
