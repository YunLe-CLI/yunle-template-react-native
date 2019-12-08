import { NativeModules } from 'react-native'
const AppInfo = NativeModules.AppInfo || {};
// todo: 临时写法
export const ENVIRONMENT: string = AppInfo.ENVIRONMENT || 'production';

export const BUILD_TYPE_DEBUG = 'debug';
export const BUILD_TYPE_RELEASE = 'release';
export type BUILD_TYPE_DEBUG = typeof BUILD_TYPE_DEBUG;
export type BUILD_TYPE_RELEASE = typeof BUILD_TYPE_RELEASE;
// todo: 临时写法
export const BUILD_TYPE: BUILD_TYPE_DEBUG | BUILD_TYPE_RELEASE = AppInfo.BUILD_TYPE || 'release';

console.log(ENVIRONMENT, 111, BUILD_TYPE)
