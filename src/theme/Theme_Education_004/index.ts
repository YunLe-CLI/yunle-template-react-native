import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_004',
  name: '教育004',
  router: createRouter(),
  models: Object.values(models),
}