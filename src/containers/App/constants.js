import yunleKey from 'yunle-key';
const pageName = 'ExpertAuAPage';

export const APP_TYPE = yunleKey({
  LOGINDING_APP: null,
  OPENMENU_APP: null,
  GLOBAL_MODAL_SHOW: null,
  GLOBAL_MODAL_HIDE: null,
}, pageName);

export default {
  APP_TYPE,
};
