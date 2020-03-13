import * as models from './models';
import createRouter from './router';

export default {
  id: 'app_Novel',
  name: '狗吱阅读',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./assets/preview.jpg'),
}