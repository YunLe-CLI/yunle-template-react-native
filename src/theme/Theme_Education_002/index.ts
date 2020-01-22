import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_002',
  name: '教育002',
  router: createRouter(),
  models: Object.values(models),
}