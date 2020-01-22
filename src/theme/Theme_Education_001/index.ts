import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_001',
  name: '教育主题001',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.png'),
}