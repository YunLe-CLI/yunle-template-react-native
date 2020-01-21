import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_005',
  name: '教育005',
  router: createRouter(),
  models: Object.values(models),
}