import theme from '@/utils/theme';
import _ from 'lodash';
import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import { getCodePushKey } from '@/utils/config';
import { ENVIRONMENT, BUILD_TYPE } from '@/utils/env';
import {saveEnv, clearAllStorage, getEnv} from '@/utils/utils';

export interface IModelState {
  theme: {};
  isOpenShare: boolean;
  orientation: string;
  appState: string;
  trafficMessage: boolean;
  ENV: string | undefined;
  BUILD_TYPE: string | undefined;
  CODE_PUSH_KEY: string | undefined;
  skipBindWeChat: boolean;
  loading: {
    visible: boolean;
    textContent: undefined | string;
  };
  playInfo: {
    type: 'audio' | 'video' | undefined;
    audioPlayer: {
      vid: string | undefined;
      time: number | undefined;
      playAuth: string | undefined;
      learnInfo: {} | undefined;
    };
    videoPlayer: {
      vid: string | undefined;
      time: number | undefined;
      playAuth: string | undefined;
      learnInfo: {} | undefined;
    };
  };
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
  theme: theme || {},
  isOpenShare: false, // 是否开启分享功能
  appState: 'active',
  orientation: 'PORTRAIT',
  trafficMessage: true,
  loading: {
    visible: false,
    textContent: 'Loading...'
  },
  ENV: ENVIRONMENT || 'production',
  BUILD_TYPE: BUILD_TYPE || 'release',
  CODE_PUSH_KEY: getCodePushKey(),
  skipBindWeChat: false,
  playInfo: {
    type: undefined,
    audioPlayer: {
      vid: undefined,
      time: undefined,
      playAuth: undefined,
      learnInfo: undefined,
    },
    videoPlayer: {
      vid: undefined,
      time: undefined,
      playAuth: undefined,
      learnInfo: undefined,
    },
  },
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
      updateState(state, { payload }) {
          return { ...state, ...payload }
      },
      saveTheme(state, { payload }) {
          return { ...state, theme: { ...state.theme, ...payload } }
      },
      changeShareStatus(state, { payload }) {
        return { ...state, isOpenShare: !!payload }
      },
      orientationChange(state, { orientation }) {
          return { ...state, orientation }
      },
      appStateChange(state, { appState }) {
          return { ...state, appState }
      },
      loading(state, { payload }) {
        return {
          ...state,
          loading: {
            visible: payload.visible,
            textContent: payload.textContent || 'Loading...',
          },
        }
      },
      changeTrafficMessage(state, { payload = false }) {
        return {
          ...state,
          trafficMessage: !!payload,
        }
      },
      setCodePushKey(state, { payload }) {
        return {
          ...state,
          ENV: _.get(payload, 'ENV', undefined),
          CODE_PUSH_KEY: _.get(payload, 'CODE_PUSH_KEY', undefined),
        };
      },
      setSkipBindWeChat(state, { payload }) {
        return {
          ...state,
          skipBindWeChat: !!payload,
        };
      },
    },
    effects: {
        *clearCache({ payload = {} }, { put }) {
          // yield put({ type: 'clearCacheHandle' });
          yield put({ type: 'auth/clearCache' });
          yield put({ type: 'courses/clearCache' });
          yield put({ type: 'home/clearCache' });
          yield put({ type: 'user/clearCache' });
          yield clearAllStorage();
        },
        *changeENV({ payload }, { put }) {
          yield saveEnv(payload || ENVIRONMENT);
          const env = yield getEnv()
          yield put({ type: 'setENV', payload: env });
        },
        *changeTheme({ payload = {} }, { put }) {
            yield put({ type: 'saveTheme', payload: { ...payload } });
        },
        *getCodePushKey({ payload }, { put }) {
          const CODE_PUSH_KEY = getCodePushKey();
          yield put({
            type: 'setCodePushKey',
            payload: {
              ENV: payload,
              CODE_PUSH_KEY,
            },
          });
          return CODE_PUSH_KEY;
        },
    },
};

export default AppModel;
