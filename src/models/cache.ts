import theme from '@/utils/theme';
import _ from 'lodash';
import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import { getCodePushKey } from '@/utils/config';
import { ENVIRONMENT, BUILD_TYPE } from '@/utils/env';
import {saveEnv, clearAllStorage, getEnv} from '@/utils/utils';

export interface IModelState {
  isVisibleLoginModal: boolean;
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
  isVisibleLoginModal: false,
};

const AppModel: IModelType = {
    namespace: 'cache',
    state: { ...initState },
    reducers: {
      clearCacheHandle() {
        return { ...initState }
      },
      openLoginModal(state) {
        return {
          ...state,
          isVisibleLoginModal: true,
        }
      },
      closeLoginModal(state) {
        return {
          ...state,
          isVisibleLoginModal: false,
        }
      },
    },
    effects: {

    },
};

export default AppModel;
