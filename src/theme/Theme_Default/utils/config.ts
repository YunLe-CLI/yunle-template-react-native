import {Platform} from "react-native";
import { ENVIRONMENT } from '@/utils/env';

export const uriPrefix = Platform.OS == 'android' ? 'xiaoshangye://xiaoshangye/' : 'xiaoshangye://';

export function getCodePushKey() {
  let CODE_PUSH_KEY = '';

  if (Platform.OS === 'ios') {
    CODE_PUSH_KEY = 'Y3Odw3fDgDAxmgG1ZTbXfsfPpoIA7UeAQ0of8_';
  }
  if (Platform.OS === 'android') {
    CODE_PUSH_KEY = '2Pa25zSE6DyK5Qt9CFiYykRmYWfQbNtgznp-Vb';
  }
  // 正试环境
  if (ENVIRONMENT === 'production') {
    if (Platform.OS === 'ios') {
      CODE_PUSH_KEY = 'Y3Odw3fDgDAxmgG1ZTbXfsfPpoIA7UeAQ0of8_';
    }
    if (Platform.OS === 'android') {
      CODE_PUSH_KEY = '2Pa25zSE6DyK5Qt9CFiYykRmYWfQbNtgznp-Vb';
    }
  }
  // 测试环境 qa development
  if (ENVIRONMENT === 'development' || ENVIRONMENT === 'qa') {
    if (Platform.OS === 'ios') {
      CODE_PUSH_KEY = 'zuvJXOJ2Y7IU8BnGPwZs8eVsnXHQWcCZfzWND';
    }
    if (Platform.OS === 'android') {
      CODE_PUSH_KEY = 'vDuCly02AMF2JpeJmVZoL9Okryk6TyPtrrTd2';
    }
  }
  return CODE_PUSH_KEY;
}

// 游客账号
export const touristsAccount = {
  mobile: '18096270696',
  smsCode: '654321'
};
