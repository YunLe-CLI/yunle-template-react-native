import { Dimensions } from 'react-native';
import { translate, setI18nConfig, supportedLanguages } from './locales/i18n';

global.i18n = {
  setI18nConfig,
  supportedLanguages,
};
global.$t = translate;

// some glboal config
global.$config = {
  
};