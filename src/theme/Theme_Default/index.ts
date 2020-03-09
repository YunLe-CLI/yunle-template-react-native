import * as models from '@Theme/Theme_Default/models';
import createRouter from '@Theme/Theme_Default/router';
import locales from '@Theme/Theme_Default/locales';

export default {
  id: 'Theme_Default',
  name: '默认主题',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('@Theme/Theme_Default/assets/preview.jpg'),
  locales: locales,
}