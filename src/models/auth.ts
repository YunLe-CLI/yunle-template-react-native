import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import { clearAllStorage } from "@/utils/utils";
import {NavigationActions} from "react-navigation";

export interface IModelState {
  token: string | undefined;
  isLogin: boolean;
};

export interface IModelType extends Model{
    namespace: string;
    state: IModelState;
    effects: {
      clearCache: Effect | EffectWithType;
      checkLogin: Effect | EffectWithType;
      login: Effect | EffectWithType;
      logout: Effect | EffectWithType;
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
  isLogin: false,
}

const authModel: IModelType = {
    namespace: 'auth',
    state: { ...initState },
    reducers: {
      clearCacheHandle() {
        return { ...initState }
      },
      updateState(state, { payload }) {
          return { ...state, ...payload }
      },
      setIsLogin(state, { payload }) {
        return {
          ...state,
          isLogin: payload.isLogin
        }
      },
      setToken(state, { payload }) {
        return {
          ...state,
          token: payload.token,
          isLogin: true,
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
        return yield put({
          type: 'setToken',
          payload: {
            token: '123',
          }
        })
      },
      *logout({ payload = {} }, { put }) {
        yield clearAllStorage();
        yield put({
          type: 'app/clearCache',
        });
        yield put(NavigationActions.navigate({
          routeName: 'Auth',
          params: {},
        }))
        return true;
      },
    },
}

export default authModel;
