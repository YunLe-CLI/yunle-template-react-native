import * as models from './models';
import createRouter from './router';

export default {
  id: 'app_Education',
  name: '教育',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.png'),
}