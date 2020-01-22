import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_003',
  name: '教育主题003',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.png'),
}