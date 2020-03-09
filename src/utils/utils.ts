import {Alert, Platform} from 'react-native';
import compareVersions from 'compare-versions';
import {NavigationActions} from "react-navigation";
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';

export const uriPrefix = Platform.OS == 'android' ? 'xiaoshangye://xiaoshangye/' : 'xiaoshangye://';
export class UrlProcessUtil {
  public dispatch = null // Will assign when navigator mount
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
  if (appInfo.appPlatform !== appInfo.appPlatform) {
    isUpdate = false;
    return isUpdate;
  }
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

export interface IActiveRoute {
  key: string | null;
  routeName: string | null;
}
export function getActiveRoute(navigationState: any): IActiveRoute {
  if (!navigationState) {
    return {
      key: null,
      routeName: null,
    }
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRoute(route)
  }
  return {
    key: route.key,
    routeName: route.routeName,
  }
}