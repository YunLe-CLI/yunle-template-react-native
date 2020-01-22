import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_006',
  name: '教育006',
  router: createRouter(),
  models: Object.values(models),
}