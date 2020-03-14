import * as models from './models';
import createRouter from './router';
import locales from './locales';

export default {
  id: 'app_Default',
  name: '默认app',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./assets/preview.jpg'),
  locales: locales,
}