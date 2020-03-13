import * as models from '@Theme/Theme_Novel/models';
import createRouter from '@Theme/Theme_Novel/router';

export default {
  id: 'Theme_Novel',
  name: '狗吱阅读',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('@Theme/Theme_Novel/doc/preview.jpg'),
}