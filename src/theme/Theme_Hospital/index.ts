import * as models from './models';
import createRouter from './router';

export default {
  id: 'hospital_000',
  name: '医院',
  router: createRouter(),
  models: Object.values(models),
}