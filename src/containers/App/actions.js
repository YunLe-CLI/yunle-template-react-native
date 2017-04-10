import { APP_TYPE } from './constants';
import config from '../config';
const {
  LOGINDING_APP,
  GLOBAL_MODAL_SHOW,
  GLOBAL_MODAL_HIDE,
  OPENMENU_APP,
} = APP_TYPE;

export function gLoadingApp({ loading = false, text }) {
  return {
    type: LOGINDING_APP,
    loading,
    text,
  };
}

export function gModalShowApp({ type, title, content, onOk, onCancel }) {
  return {
    type: GLOBAL_MODAL_SHOW,
    info: {
      type,
      title,
      content,
      onOk,
      onCancel,
    },
  };
}

export function gModalHideApp() {
  return {
    type: GLOBAL_MODAL_HIDE,
  };
}

export function openMenuApp(item) {
  return {
    type: OPENMENU_APP,
    item,
  };
}
let f = {};
let actions = {};
const d = config.map((item, index) => {
	const a = item.actions;
	f = Object.assign(f, { ...a })
	actions[item.root] = a;
	return a;
});

export default Object.assign(actions, {
	app: {
		gLoadingApp,
		gModalShowApp,
		gModalHideApp,
		openMenuApp,
	},
});
