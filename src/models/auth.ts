import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import {NavigationActions} from "react-navigation";

export interface IModelState {
  token: string | undefined;
};

export interface IModelType extends Model{
    namespace: string;
    state: IModelState;
    effects: {
      clearCache: Effect | EffectWithType;
      checkLogin: Effect | EffectWithType;
      login: Effect | EffectWithType;
      logout: Effect | EffectWithType;
      openModal: Effect | EffectWithType;
      closeModal: Effect | EffectWithType;
    };
    reducers: {
      clearCacheHandle: Reducer<IModelState>;
      updateState: Reducer<IModelState>;
      setIsLogin: Reducer<IModelState>;
      setToken: Reducer<IModelState>;
    };
}

const initState: IModelState = {
  token: '',
}

const authModel: IModelType = {
    namespace: 'auth',
    state: { ...initState },
    reducers: {
      clearCacheHandle(state) {
        return { ...initState }
      },
      setToken(state, { payload }) {
        return {
          ...state,
          token: payload.token,
        }
      },
    },
    effects: {
      *clearCache({ payload = {} }, { put }) {
        yield put({ type: 'clearCacheHandle' });
      },
      *checkLogin({ payload = {} }, { put, select }) {
        const token = yield select(({ auth }: { auth: IModelState }) => auth.token);
        let isLogin = !!token;
        return isLogin
      },
      *login({ payload = {} }, { put }) {
        // const { mobile, smsCode }: { mobile: string, smsCode: string } = payload;
        const res = yield put({
          type: 'setToken',
          payload: {
            token: payload.token,
          }
        })
        return res
      },
      *logout({ payload = {} }, { put }) {
        yield put({
          type: 'app/clearCache',
        });
        return true;
      },
    },
}

export default authModel;
