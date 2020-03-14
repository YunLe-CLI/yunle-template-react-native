import _ from 'lodash';
import lightGetTheme from './light/components';
import lightPlatform from './light/variables/platform';

import darkGetTheme from './dark/components';
import darkPlatform from './dark/variables/platform';

const themes =  {
  light: lightGetTheme(lightPlatform),
  dark: darkGetTheme(darkPlatform),
}

export default themes;