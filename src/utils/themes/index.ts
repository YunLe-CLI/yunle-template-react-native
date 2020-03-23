import _ from 'lodash';
import { Mode } from 'react-native-dark-mode'
import defaultThemeName from './defaultThemeName'

import nativeGetTheme from './components';

export type ThemeType =  {
  light: any;
  dark: any;
}

export type ThemesType = {
  [key: string]: ThemeType;
}

const themes: ThemesType =  {
  defaultThemeName,
}

const themesMemoize = _.memoize((key: string) => {
  return themes[key]
});


export function getTheme (themeName: string, mode: Mode = 'light') {
  let nowThemeName: ThemeType = defaultThemeName;
  const supportedThemes: ThemeType = themes[themeName];
  const list = Object.keys(themes);
  if (themeName && list.findIndex((item) => themeName === item) > -1) {
    nowThemeName = supportedThemes;
  } else {
    // 设置默认主题
    nowThemeName = defaultThemeName;
  }
  return nativeGetTheme(nowThemeName[mode])
}

export default themes;