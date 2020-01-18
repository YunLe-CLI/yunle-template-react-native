import * as models from './models';
import createRouter from './router';

export default {
  id: 'meeting_000',
  name: '会议',
  router: createRouter(),
  models: Object.values(models),
}