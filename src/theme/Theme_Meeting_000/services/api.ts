import {Platform} from "react-native";
import request from './request'
import {ENVIRONMENT} from "@/utils/env";
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

/**
 * 登录
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface LOGIN_REQ {
  "loginName": string;
  "password": string;
}
export interface LOGIN_RES {
  "code": number;
  "success": boolean;
  "data":{
    "token": string;
    "expires": number;
    "username": string;
    "createTime": number;
    "enterpriseId": string;
    "userId": string;
    "roles": string[];
    "authorities":{
      "canAccessKnowLedge": boolean;
      "canAccessPortal":boolean;
    };
    "code": number;
    "msg": string;
    "dutyLevel": string;
    "openStatus": number;
    "weakPwd": boolean;
    "name": string;
  }
}
export async function LOGIN(query: LOGIN_REQ): Promise<LOGIN_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/user-login`;
  return request({
    url: url,
    method: 'POST',
    data: query,
  });
}

/**
 * 今日会议
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param query
 * @constructor
 */
export interface MEETING_TODAY_REQ {

}
export interface META_DATA {
  "Id": string;
  "Topic": string;
  "MeetingNo": number;
  "StartTime": string;
  "UTCStartTime": string;
  "OpenHostVideo": boolean;
  "Duration": number;
  "Status": number;
  "MeetingType": number;
}
export interface USER_INFO {
  "loginName": string;
  "mobile": string;
  "name": string;
  "departmentId":string;
  "password":string;
  "virtualMobile":string;
  "userId":string;
  "createTime":number;
  "id":string;
}
export interface MEETING_ITEM {
  "participantIds": string[];
  "status": number;// 会议状态（-1取消 1-进行中 2-未开始 3-结束）
  "name": string;// 会议名称
  "startTime": number;// 开始时间
  "endTime": number;// 结束时间
  "presenterId": string;// 发起人id
  "metaData": META_DATA,
  "createTime": number;
  "presenter": USER_INFO,
  "participants": Array<USER_INFO>,
  "id": string;
}
export interface MEETING_TODAY_RES {
  "code": number;
  "success": boolean;
  "data": Array<MEETING_ITEM>;
}
export async function MEETING_TODAY(query: MEETING_TODAY_REQ): Promise<MEETING_TODAY_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/meeting/today`;
  return request({
    url: url,
    method: 'GET',
  });
}
/**
 * 全部会议
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param query
 * @constructor
 */
export interface MEETING_ALL_REQ {
  isClient: boolean;
}
export interface MEETING_ALL_RES {
  "code": number;
  "success": boolean;
  "data": Array<MEETING_ITEM>;
}
export async function MEETING_ALL(query: MEETING_ALL_REQ): Promise<MEETING_ALL_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/meeting`;
  return request({
    url: url,
    method: 'GET',
    params: query,
  });
}
/**
 * 部门列表
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param query
 * @constructor
 */
export interface DEPARTMENTS_REQ {

}
export interface DEPARTMENTS_ITEM {
  "name": string;
  "desc": string;
  "createTime": number;
  "id": string;
  "pid": string | undefined;
  "children": Array<DEPARTMENTS_ITEM>;
}
export interface DEPARTMENTS_RES {
  "code": number;
  "success": boolean;
  "data": Array<DEPARTMENTS_ITEM>;
}
export async function DEPARTMENTS(query: DEPARTMENTS_REQ): Promise<DEPARTMENTS_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/departments`;
  return request({
    url: url,
    method: 'GET',
    params: query,
  });
}
/**
 * 发起会议
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param query
 * @constructor
 */
export interface SPONSOR_MEETING_REQ {
  "id"?: string; // 会议id（修改时）
  "name": string;// 会议名
  "duration": number;// 时长
  "presenterId": string;// 主持人
  "participantIds": string[]; // 参与人
}
export interface SPONSOR_MEETING_RES {
  "code": number;
  "success": boolean;
  "data": Array<MEETING_ITEM>;
}
export async function SPONSOR_MEETING(query: SPONSOR_MEETING_REQ): Promise<SPONSOR_MEETING_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/meeting/sponsor`;
  return request({
    url: url,
    method: 'POST',
    data: query,
  });
}
/**
 * 预约会议
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param query
 * @constructor
 */
export interface SCHEDULE_MEETING_REQ {
  "id"?: string; // 会议id（修改时）
  "name": string;// 会议名
  "duration": number;// 时长
  "presenterId": string;// 主持人
  "startTime":1579287790692;// 开始时间
  "endTime":1579257990692;// 结束时间
  "participantIds": string[]; // 参与人
}
export interface SCHEDULE_MEETING_RES {
  "code": number;
  "success": boolean;
  "data": Array<MEETING_ITEM>;
}
export async function SCHEDULE_MEETING(query: SCHEDULE_MEETING_REQ): Promise<SCHEDULE_MEETING_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/meeting/schedule`;
  return request({
    url: url,
    method: 'POST',
    data: query,
  });
}

/**
 * 用户列表
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param query
 * @constructor
 */
export interface USER_LIST_REQ {
  "departmentId": string; // 部门id
}
export interface USER_INFO {
  "loginName": string;
  "mobile":string;
  "name":string;
  "departmentId":string;
  "virtualMobile":string;
  "createTime":number;
  "id":string;
}
export interface SCHEDULE_MEETING_RES {
  "code": number;
  "success": boolean;
  "data": Array<USER_INFO>;
}
export async function USER_LIST(query: USER_LIST_REQ): Promise<USER_LIST_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/users`;
  return request({
    url: url,
    method: 'GET',
    params: query,
  });
}

export interface CLOSE_MEETING_REQ {
  id: number;
}
export interface CLOSE_MEETING_RES {
  "code": number;
  "success": boolean;
}
export async function CLOSE_MEETING(query: CLOSE_MEETING_REQ): Promise<CLOSE_MEETING_RES> {
  const url = `https://meeting-api.dev.class100.com/api/v1/meeting/${query.id}/over`;
  return request({
    url: url,
    method: 'GET',
    params: query,
  });
}


