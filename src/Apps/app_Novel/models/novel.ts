import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import _ from 'lodash';


export interface IModelState {
  isTouristsAccount: boolean;
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
}

const userModel: IModelType = {
    namespace: 'novel',
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
        yield put({ type: 'setUser', payload: { user: payload.user }});
        return yield select(({ user }) => user.info);
      },
    },
}

export default userModel;
