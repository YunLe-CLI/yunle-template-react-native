import _ from 'lodash';
import dark from './variables/dark';
import light from './variables/light';

import nativeGetTheme from './components';
const themesMemoize = _.memoize(_.keys);
const themes =  {
  light,
  dark,
}

const defaultThemeName = 'light';

export function getTheme (themeName: string) {
  let nowThemeName = defaultThemeName;
  const supportedThemes = themesMemoize(themes);

  if (themeName && supportedThemes.findIndex((item) => themeName === item) > -1) {
    nowThemeName = themeName;
  } else {
    // 设置默认主题
    nowThemeName = defaultThemeName;
  }
  return nativeGetTheme(themes[nowThemeName])
}

export default themes;