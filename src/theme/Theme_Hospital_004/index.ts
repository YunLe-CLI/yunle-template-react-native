import * as models from './models';
import createRouter from './router';

export default {
  id: 'hospital_004',
  name: '医院主题_004',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.png'),
}