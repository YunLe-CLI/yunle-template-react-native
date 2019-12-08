import {Alert, Platform} from 'react-native';
import RNFS, { LibraryDirectoryPath, ExternalDirectoryPath } from 'react-native-fs';
import CameraRoll from "@react-native-community/cameraroll";
import isAbsoluteUrl from "is-absolute-url";
import compareVersions from 'compare-versions';
import { uriPrefix } from "@/utils/config";
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions} from "react-navigation";
import Permissions, { PERMISSIONS, RESULTS } from 'react-native-permissions';
import ShareUtile from "@/utils/umeng/ShareUtil";
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import { ENVIRONMENT } from '@/utils/env';

export async function getOrigin(url: string, type: string = 'app'): Promise<string> {
  // eslint-disable-next-line
  let origin = '';
  if (isAbsoluteUrl(url)) {
    return url
  }
  const nowEnv = await getEnv();
  // debugger
  switch (nowEnv) {
    case 'production': {
      if (type === 'wx') {
        origin = 'https://wx-xsy-svc.laolusays.com'
      }
      if (type === 'app') {
        origin = 'https://app-api.laolusays.com';
      }
      break
    }
    case 'development': {
      if (type === 'wx') {
        origin = 'https://wx-xsy-svc-test.laolusays.com'
      }
      if (type === 'app') {
        origin = 'https://app-api-test.laolusays.com';
      }
      break
    }
    case 'qa': {
      if (type === 'wx') {
        origin = 'https://wx-xsy-svc-test.laolusays.com'
      }
      if (type === 'app') {
        origin = 'https://app-api-test.laolusays.com';
      }
      break
    }
    default: {
      if (type === 'wx') {
        origin = 'https://wx-xsy-svc.laolusays.com'
      }
      if (type === 'app') {
        origin = 'https://app-api.laolusays.com';
      }
    }
  }
  console.log('API：', ENVIRONMENT, origin + url);
  return origin + url;
}

export class UrlProcessUtil {
  dispatch = null // Will assign when navigator mount
  // This two function copy from react-navigation/src/createNavigationContainer.js
  // Modify by wd add more feature
  static _urlToPathAndParams(url: string) {
    const params = {};
    const delimiter = uriPrefix;
    let path = url.split(delimiter)[1];
    if (typeof path === 'undefined') {
      path = url;
    } else if (path === '') {
      path = '/';
    }

    // remove leading '/'
    if(path.indexOf('/') == 0)
      path = path.substring(1)

    return {
      path,
      params
    };
  }

  static handleOpenURL(url: string | null) {
    if(!url)
      return
    try {
      let action
      const parsedUrl = UrlProcessUtil._urlToPathAndParams(url);
      if (parsedUrl) {
        const { path, params } = parsedUrl;
        // @ts-ignore
        action = NavigationActions.navigate({
          routeName: path,
          params: {
            ...params,
          },
        });
      }
      // @ts-ignore
      if (action && UrlProcessUtil.dispatch) {
        // @ts-ignore
        UrlProcessUtil.dispatch(action)
      }
    } catch (e) {
    }
  }
}

export async function saveToken(token: string)  {
  return await AsyncStorage.setItem('token', token);
}
export async function getToken()  {
  return await AsyncStorage.getItem('token');
}
export async function clearToken()  {
  return await AsyncStorage.removeItem('token');
}

export async function saveEnv(env: string)  {
  await AsyncStorage.setItem('ENVIRONMENT', env);
  global.ENVIRONMENT = env || ENVIRONMENT;
  return global.ENVIRONMENT;
}
export async function getEnv(): Promise<string | null> {
  if (!global.ENVIRONMENT) {
    global.ENVIRONMENT = await AsyncStorage.getItem('ENVIRONMENT') || ENVIRONMENT;
  }
  return global.ENVIRONMENT || ENVIRONMENT;
}
export async function clearEnv()  {
  await AsyncStorage.removeItem('ENVIRONMENT');
  global.ENVIRONMENT = '';
  return '';
}

export async function clearAllStorage()  {
  try {
    // await AsyncStorage.clear();
    await clearToken();
    // await clearEnv();
    // await AsyncStorage.removeItem('root');
  } catch(e) {
    // clear error
    console.log(1111, e)
  }
}


/**
 * 下载网页图片
 * @param uri  图片地址
 * @returns {*}
 */
export const DownloadImage = async (uri: string) => {
  if (!uri) return null;
  const currentStatus = await Permissions.check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  if (currentStatus !== RESULTS.GRANTED) {
    const status = await Permissions.request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (status !== RESULTS.GRANTED) {
      showMsg({
        message: "权限问题",
        description: "请重新设置获取相册授权",
        type: "error",
      });
      throw '未请求/被拒绝但可请求, 请重新授权';
    }
  }
  let resultURL = undefined;
  try  {
    let timestamp = (new Date()).getTime();//获取当前时间错
    let random = String(((Math.random() * 1000000) | 0))//六位随机数
    let dirs = Platform.OS === 'ios' ? LibraryDirectoryPath : ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp+random}.jpg`;
    const options = {
      fromUrl: uri,
      toFile: downloadDest,
      background: true,
      begin: (res: any) => {
        // console.log('begin', res);
        // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
    };
    const ret = await RNFS.downloadFile(options).promise;
    if (ret) {
      const result = await CameraRoll.saveToCameraRoll(downloadDest);
      if (result) {
        resultURL = result;
      } else {
        throw '无法保存图片'
      }
    } else {
      throw '无法下载数据'
    }
  } catch (e) {
    console.log(e)
  }
  return resultURL;
};

export const saveLocalImage = async (uri: string) => {
  if (!uri) return null;
  const currentStatus = await Permissions.check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  if (currentStatus !== RESULTS.GRANTED) {
    const status = await Permissions.request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (status !== RESULTS.GRANTED) {
      showMsg({
        message: "权限问题",
        description: "请重新设置授权保存相册权限",
        type: "error",
      });
      throw '未请求/被拒绝但可请求, 请重新授权';
    }
  }
  let resultURL = undefined;
  try  {
    if (uri) {
      const result = await CameraRoll.saveToCameraRoll(uri);
      if (result) {
        resultURL = result;
      } else {
        throw '无法保存图片'
      }
    } else {
      throw '无法下载数据'
    }
  } catch (e) {
    console.log(e)
  }
  return resultURL;
};

/**
 * 下载base64图片
 * @param base64  图片地址
 * @returns {*}
 */
export const DownloadBase64Image = async (data: string) => {
  if (!data) return null;
  const currentStatus = await Permissions.check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  if (currentStatus !== RESULTS.GRANTED) {
    const status = await Permissions.request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (status !== RESULTS.GRANTED) {
      showMsg({
        message: "权限问题",
        description: "请重新设置获取相册授权",
        type: "error",
      });
      throw '未请求/被拒绝但可请求, 请重新授权';
    }
  }
  let resultURL = undefined;
  try  {
    let timestamp = (new Date()).getTime();//获取当前时间错
    let random = String(((Math.random() * 1000000) | 0))//六位随机数
    let dirs = Platform.OS === 'ios' ? LibraryDirectoryPath : ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp+random}.jpg`;
    const imgData = data.split('data:image/png;base64,')[1] || data;
    await RNFS.writeFile(downloadDest, imgData, 'base64');
    if (downloadDest) {
      const result = await CameraRoll.saveToCameraRoll(downloadDest);
      if (result) {
        resultURL = result;
      } else {
        throw '无法保存图片'
      }
    } else {
      throw '无法下载数据'
    }
  } catch (e) {
  }
  return resultURL;
};

/**
 * 分享base64图片
 * @param base64  图片地址
 * @returns {*}
 */
export const shareBase64Img = async (data: string, platform?: number) => {
  if (!data) return null;
  const currentStatus = await Permissions.check(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  if (currentStatus !== RESULTS.GRANTED) {
    const status = await Permissions.request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY  :  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (status !== RESULTS.GRANTED) {
      showMsg({
        message: "权限问题",
        description: "请重新设置获取相册授权",
        type: "error",
      });
      throw '未请求/被拒绝但可请求, 请重新授权';
    }
  }
  let resultURL = undefined;
  try  {
    let timestamp = (new Date()).getTime();//获取当前时间错
    let random = String(((Math.random() * 1000000) | 0))//六位随机数
    let dirs = Platform.OS === 'ios' ? LibraryDirectoryPath : ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp+random}.jpg`;
    const imgData = data.split('data:image/png;base64,')[1] || data;
    await RNFS.writeFile(downloadDest, imgData, 'base64');
    console.log(downloadDest, 1111)
    if (downloadDest) {
      ShareUtile.share('', downloadDest, '', '', platform || 2,(code: number, message: string) =>{

      });
    } else {
      throw '无法下载数据'
    }
  } catch (e) {
  }
  return resultURL;
};


export function showMsg(option: { type:
    | 'info'
    | 'warn'
    | 'error'
    | 'custom'
    | 'success', message: string, description: string | undefined }, target?: any) {
  if (target && target.alertWithType) {
    target.alertWithType(option.type, option.message, option.description)
  } else {
    if (global.dropDownAlertRef) {
      global.dropDownAlertRef.alertWithType(option.type, option.message, option.description)
    } else {
      Alert.alert(option.message)
    }
  }
}

export interface IAppInfo {
  appPlatform: 'android' | 'ios' | string;
  appVersion: string; // '0.0.8'
  appBuildNumber: number | string; // 1
};
export function checkAppVersion(remoteVersion: IAppInfo): boolean {
  const appInfo = {
    appPlatform: Platform.OS,
    appVersion: DeviceInfo.getVersion(),
    appBuildNumber: DeviceInfo.getBuildNumber(),
  };
  let isUpdate = false;
  try {
    const compareNum = compareVersions(remoteVersion.appVersion, appInfo.appVersion);
    const isVersions = compareNum >= 1;
    const isBuild = _.toNumber(remoteVersion.appBuildNumber) > _.toNumber(appInfo.appBuildNumber);
    isUpdate = isVersions;
    if (compareNum === 0) {
      isUpdate = isBuild;
    }
  } catch (e) {
    isUpdate = false;
  } finally {

  }
  return isUpdate
}
