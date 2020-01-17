import * as models from './models';
import createRouter from './router';

export const PERSIST_KEY = 'Theme_Hospital';

export default {
  PERSIST_KEY,
  router: createRouter(),
  models: Object.values(models),
}