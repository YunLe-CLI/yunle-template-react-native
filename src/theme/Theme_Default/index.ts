import * as models from '@Theme/Theme_Default/models';
import createRouter from '@Theme/Theme_Default/router';

export default {
  id: 'Theme_Default',
  name: '默认主题',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('@Theme/Theme_Default/doc/preview.jpg'),
}