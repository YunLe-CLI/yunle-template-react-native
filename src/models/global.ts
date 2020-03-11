import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { Mode, eventEmitter, initialMode } from 'react-native-dark-mode'
import { ENVIRONMENT, BUILD_TYPE } from '@Global/utils/env';

export interface GlobalModelState {
  orientation: string;
  appState: string;
  appReloadNum: boolean;
  mode: Mode;
}

export interface GlobalModelType {
  namespace: 'global',
  state: GlobalModelState;
  effects: {
    clearCache: Effect;
  };
  reducers: {
    clearCacheHandle: Reducer<GlobalModelState>;
    appReload: Reducer<GlobalModelState>;
    orientationChange: Reducer<GlobalModelState>;
    appStateChange: Reducer<GlobalModelState>;
    setENV: Reducer<GlobalModelState>;
    setMode: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const INIT_STATE: GlobalModelState = {
  appState: 'active',
  orientation: 'PORTRAIT',
  appReloadNum: false,
  mode: initialMode,
};

const GlobalModel: GlobalModelType = {
    namespace: 'global',
    state: { ...INIT_STATE },
    reducers: {
      clearCacheHandle() {
        return { ...INIT_STATE }
      },
      setENV(state, { payload }) {
        return {
          ...state,
          ENV: payload || ENVIRONMENT,
          BUILD_TYPE: BUILD_TYPE,
        }
      },
      orientationChange(state, { orientation }) {
        return { ...state, orientation }
      },
      appStateChange(state, { appState }) {
        return { ...state, appState }
      },
      appReload(state, { appReload }) {
        return { ...state, appReload: !!appReload }
      },
      setMode(state, { mode }) {
        return { ...state, mode }
      }
    },
    effects: {
        *clearCache({ payload = {} }, { put }) {
          yield put({ type: 'clearCacheHandle' });
        },
    },
    subscriptions: {
      setup: ({ dispatch }) => {
        if (!global.$APP_INIT) {
          global.$APP_INIT = true;
          eventEmitter.on('currentModeChanged', newMode => {
            console.log('Switched to', newMode, 'mode')
            dispatch({
              type: 'setMode',
              mode: newMode,
            })
          });
        }
      }
    },
};

export default GlobalModel;
