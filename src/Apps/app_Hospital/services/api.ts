import request from './request'
import _ from 'lodash';

/**
 * 患者登录
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1084&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface LOGIN_REQ {
  "mobile": string;
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
  const url = `/patient-login`;
  return request({
    url: url,
    method: 'POST',
    data: query,
  });
}

/**
 * 患者app端预约
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1095&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface MAKE_LIST_REQ {

};
export interface META_DATA {
  "Id": "dkgzquiqSGK5oFlizWuqgQ==",
  "Topic": "五官科-医生A",
  "MeetingNo": 207309770,
  "StartTime": "2020-01-18 09:00:00",
  "UTCStartTime": "2020-01-18 01:00:00",
  "OpenHostVideo": true,
  "Duration": 360,
  "Status": 0,
  "MeetingType": 0
}
export interface MAKE_ITEM {
  "id": string;
  "timeslot": number;// 时间段(1-上午 2-下午)
  "date": number;
  "startTime": string;
  "endTime": string;
  "registrationFee": number;
  "name": string;
  "medicalDepartment": string;
  "hospitalName": string;
  "professionalTitle": string;
  "status": number;// 就诊状态（ -1.取消 1.已预约 2-进行中 3-已诊 4-未到）
  "metaData": META_DATA;
}
export interface MAKE_LIST_RES {
  "code": number;
  "success": boolean;
  "data":{
    "today":Array<MAKE_ITEM>,
    "registrations": Array<MAKE_ITEM>
  }
};
export async function MAKE_LIST(query: MAKE_LIST_REQ): Promise<MAKE_LIST_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/patients/appointment`;
  return request({
    url: url,
    method: 'GET',
  });
}

/**
 * 医生列表
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1086&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface DOCTORS_LIST_REQ {
  
}
export interface DOCTOR_ITEM {
  "registrationFee": number;// 预设挂号费
  "name": string;// 名字
  "loginName": string;
  "mobile": string;
  "virtualMobile": string;
  "userId": string;
  "createTime": number;
  "avatar":string; // 头像
  "hospitalName":string;// 医院
  "medicalDepartment":string;// 科室
  "professionalTitle":string;// 职称
  "personalIntro":string;// 个人介绍
  "skillsIntro":string;// 技能介绍
  "id":string;
}
export interface DOCTORS_LIST_RES {
  "code":0,
  "success":true,
  "data": Array<DOCTOR_ITEM>
}
export async function DOCTORS_LIST(query: DOCTORS_LIST_REQ): Promise<MAKE_LIST_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/doctors`;
  return request({
    url: url,
    method: 'GET',
  });
}

/**
 * 医生app端预约列表
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1111&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */

export interface APPOINTMENT_REQ {
  doctorId: string;
}
export interface REGISTRATIONS_ITEM_INFO {
  "id": string,
  "timeslot": number;// 时间段（1-上午 2-下午）
  "maxNum":  number;// 最大人数
  "registrationFee":  number;// 挂号费=
  "status":  number;// 状态（1-未开启 2-开启 ）
  "readyCount":  number;// 已挂号数
  "remainCount": number;// 剩余挂号数
  "playbackURL": string; // 回放地址
}
export interface REGISTRATIONS_ITEM {
  "date": string;
  "week": number;
  "data": Array<REGISTRATIONS_ITEM_INFO>
}
export interface APPOINTMENT_RES {
  "code": number;
  "success": boolean;
  "data":{
    "registrationCount": number;// 总预约数
    "registrations": Array<REGISTRATIONS_ITEM>
  }
}

export async function APPOINTMENT(query:APPOINTMENT_REQ): Promise<APPOINTMENT_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/doctors/appointment`;
  return request({
    url: url,
    method: 'GET',
    params: query
  });
}

/**
 * 患者预约
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1091&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface MAKE_POST_REQ {
  registration_id: string;
  remark: string;
  patientId: string;
}
export interface MAKE_POST_RES {
  "code": number;
  "success": boolean;
  "data": number;
}
export async function MAKE_POST(query: MAKE_POST_REQ): Promise<MAKE_POST_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/registrations/${query.registration_id}/patient`;
  return request({
    url: url,
    method: 'POST',
    data: query,
  });
}

/**
 * 获取医生信息
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1109&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface DOCTORS_DETAILS_REQ {
  doctors_id: string;
}
export interface DOCTORS_INFO {
  "registrationFee": number;
  "name": string;
  "loginName": string;
  "password": string;
  "mobile": string;
  "virtualMobile": string;
  "userId": string;
  "createTime": undefined;
  "avatar": string;
  "hospitalName": string;
  "medicalDepartment": string;
  "professionalTitle": string;
  "id": string;
}
export interface DOCTORS_DETAILS_RES {
  "code": number;
  "success": boolean;
  "data": DOCTORS_INFO;
}
export async function DOCTORS_DETAILS(query: DOCTORS_DETAILS_REQ): Promise<DOCTORS_DETAILS_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/doctors/info`;
  return request({
    url: url,
    method: 'GET',
    data: query,
  });
}

/**
 * 获取患者信息
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1109&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface PATIENTS_DETAILS_REQ {
}
export interface PATIENTS_INFO {
  "name": string;
  "mobile": string;
  "virtualMobile": string;
  "userId": string;
  "createTime": number;
  "age": number;
  "gender": number;
  "birthdate": number;
  "idCard": string;
  "id": string;
}
export interface PATIENTS_DETAILS_RES {
  "code": number;
  "success": boolean;
  "data": PATIENTS_INFO;
}
export async function PATIENTS_DETAILS(query: PATIENTS_DETAILS_REQ): Promise<PATIENTS_DETAILS_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/patients/info`;
  return request({
    url: url,
    method: 'GET',
  });
}
/**
 * 请求房间消息（当前诊断人id）
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1109&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface ROOM_MESSAGE_REQ {
  mettingNo: string;
}
export interface ROOM_MESSAGE_RES {
  "code": number;
  "success": boolean;
  "data":{
    "kickId": string;// 被踢id，云视讯会议中的userid
    "nextId": string;// 下一个id，业务服务那边传过来的userid
    "mettingNuber": string;// 云视讯房间号
  }
}
export async function ROOM_MESSAGE(query: ROOM_MESSAGE_REQ): Promise<ROOM_MESSAGE_RES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/meeting/${query.mettingNo}/message`;
  return request({
    url: url,
    method: 'GET',
  });
}
/**
 * 请求房间消息（当前诊断人id）
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1109&projectName=%E5%8C%BB%E7%96%97demo&projectID=77
 * @param params
 */
export interface PATIENTS_INFO_PUTREQ {
  "id": string;// 修改必传
  "name":string;// 【必须】
  "mobile":string;
  "idCard":string;// 身份证
  "birthdate":number;// 生日
  "gender":number;// 性别（1-男 2-女）
  "age":number;// 年龄
  "medicalHistory":string;// 病史
}
export interface PATIENTS_INFO_PUTRES {
  "code": number;
  "success": boolean;
  "data":{
    "name": string;
    "mobile": string;
    "virtualMobile": string;
    "userId": string;
    "createTime": number;
    "id": string;
  }
}
export async function PATIENTS_INFO_PUT(query: PATIENTS_INFO_PUTREQ): Promise<PATIENTS_INFO_PUTRES> {
  const url = `https://treatment-api.dev.class100.com/api/v1/patients`;
  return request({
    url: url,
    method: 'POST',
    data: query
  });
}

