import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
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
      setUserAsync: Effect | EffectWithType;
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
      *setUserAsync({ payload = {} }, { put, select }) {
        yield put({ type: 'user', payload: { user: payload.user } });
        return yield select(({ user }) => user.info);
      },
    },
}

export default userModel;
