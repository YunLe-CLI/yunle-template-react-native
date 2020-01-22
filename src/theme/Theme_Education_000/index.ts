import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_000',
  name: '教育000',
  router: createRouter(),
  models: Object.values(models),
}