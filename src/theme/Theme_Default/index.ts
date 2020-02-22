import * as models from './models';
import createRouter from './router';

export default {
  id: 'Theme_Default',
  name: '默认主题',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.jpg'),
}