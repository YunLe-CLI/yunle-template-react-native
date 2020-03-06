import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { ENVIRONMENT, BUILD_TYPE } from '@Global/utils/env';
import { ConnectState } from './connect.d';

export interface GlobalModelState {
  orientation: string;
  appState: string;
  appReloadNum: boolean;
}


export interface GlobalModelType {
  namespace: 'global';
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
  };
  subscriptions: { setup: Subscription };
}

const INIT_STATE: GlobalModelState = {
  appState: 'active',
  orientation: 'PORTRAIT',
  appReloadNum: false,
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
      }
    },
    effects: {
        *clearCache({ payload = {} }, { put }) {
          yield put({ type: 'clearCacheHandle' });
        },
    },
    subscriptions: {},
};

export default GlobalModel;
