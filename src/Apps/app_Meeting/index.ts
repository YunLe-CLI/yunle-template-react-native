import * as models from './models';
import createRouter from './router';

export default {
  id: 'app_Meeting',
  name: '会议',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./doc/preview.png'),
}