import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_004',
  name: '教育主题004',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.png'),
}