import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import { ENVIRONMENT, BUILD_TYPE } from '@Global/utils/env';

export interface IModelState {
  orientation: string;
  appState: string;
  appReloadNum: boolean;
};

export interface IModelType extends Model{
    namespace: string;
    state: IModelState;
    effects: {
      clearCache: Effect | EffectWithType;
      appReloadAsync: Effect | EffectWithType;
    };
    reducers: {
      clearCacheHandle: Reducer<any>;
      appReload: Reducer<any>;
      orientationChange: Reducer<any>;
      appStateChange: Reducer<any>;
      setENV: Reducer<any>;
    };
};

const initState: IModelState = {
  appState: 'active',
  orientation: 'PORTRAIT',
  appReloadNum: false,
};

const AppModel: IModelType = {
    namespace: 'app',
    state: { ...initState },
    reducers: {
      clearCacheHandle() {
        return { ...initState }
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
        *appReloadAsync({ payload = {} }, { put, select }) {
          yield put({ type: 'appReload', appReload: payload.appReload || true });
          return yield put(({ app }) => app.appReload);
        },
    },
};

export default AppModel;
