import * as models from './models';
import createRouter from './router';
import locales from './locales';

export default {
  id: 'native_base_demo',
  name: 'nativeBase模板',
  router: createRouter(),
  models: Object.values(models),
  author: '大狗吱',
  preview: require('./assets/preview.png'),
  locales: locales,
}