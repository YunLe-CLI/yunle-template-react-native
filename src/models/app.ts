import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import { ENVIRONMENT, BUILD_TYPE } from '@/utils/env';

export interface IModelState {
  orientation: string;
  appState: string;
};

export interface IModelType extends Model{
    namespace: string;
    state: IModelState;
    effects: {
      clearCache: Effect | EffectWithType;
      changeENV: Effect | EffectWithType;
      changeTheme: Effect | EffectWithType;
      getCodePushKey: Effect | EffectWithType;
    };
    reducers: {
      clearCacheHandle: Reducer<any>;
      setENV: Reducer<any>;
      updateState: Reducer<any>;
      saveTheme: Reducer<any>;
      changeShareStatus: Reducer<any>;
      orientationChange: Reducer<any>;
      appStateChange: Reducer<any>;
      loading: Reducer<any>;
      changeTrafficMessage: Reducer<any>;
      setCodePushKey: Reducer<any>;
      setSkipBindWeChat: Reducer<any>;
    };
};

const initState: IModelState = {
  appState: 'active',
  orientation: 'PORTRAIT',
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
    },
    effects: {
        *clearCache({ payload = {} }, { put }) {
          yield put({ type: 'auth/clearCache' });
          yield put({ type: 'courses/clearCache' });
          yield put({ type: 'home/clearCache' });
          yield put({ type: 'user/clearCache' });
        },
    },
};

export default AppModel;
