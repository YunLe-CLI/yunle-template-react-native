import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_003',
  name: '教育003',
  router: createRouter(),
  models: Object.values(models),
}