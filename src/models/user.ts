import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import { bindPhone, bindWx, postFeedback, getUserInfo } from '@/services/api';
import { getToken } from "@/utils/utils";
import _ from 'lodash';
import {touristsAccount} from '@/utils/config';

export interface IModelState {
  isTouristsAccount: boolean;
  info: {} | undefined;
};

export interface IModelType extends Model{
    namespace: string;
    state: IModelState;
    effects: {
      clearCache: Effect | EffectWithType;
      getUser: Effect | EffectWithType;
      postFeedback: Effect | EffectWithType;
      bindWx: Effect | EffectWithType;
      bindPhone: Effect | EffectWithType;
    };
    reducers: {
      clearCacheHandle: Reducer<IModelState>;
      setUser: Reducer<IModelState>;
    };
}

const initState: IModelState = {
  isTouristsAccount: false,
  info: undefined,
}

const userModel: IModelType = {
    namespace: 'user',
    state: {...initState},
    reducers: {
      clearCacheHandle() {
        return { ...initState }
      },
      setUser(state, { payload }) {
        const mobile = _.get(payload, 'user.mobile', '');
        const isTouristsAccount: boolean = mobile === touristsAccount.mobile;
        return {
          ...state,
          info: payload.user,
          isTouristsAccount: isTouristsAccount,
        }
      },
    },
    effects: {
      *clearCache({ payload = {} }, { put }) {
        yield put({ type: 'clearCacheHandle' });
      },
    },
}

export default userModel;
