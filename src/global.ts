import { translate, setI18nConfig, supportedLanguages } from './locales/i18n';
import { ENVIRONMENT, BUILD_TYPE } from '@Global/utils/env';

global.i18n = {
  setI18nConfig,
  supportedLanguages,
};

global.$t = translate;

// some glboal config
global.$config = {
  environment: ENVIRONMENT,
  buildType: BUILD_TYPE,
};