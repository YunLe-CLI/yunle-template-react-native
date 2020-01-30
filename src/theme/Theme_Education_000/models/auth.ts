import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import {NavigationActions} from "react-navigation";
import { LOGIN_MODAL_THIS } from "../components/LoginModal";

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
  token: "nS7/3Ol6gFDATpn1jN7G9FpGacdSVEnWUZJjrnO83ckk6JAhCiucwMe8hHjJlwNRAYGhU6FGLYNHgoOvabDQmVCUg3cb54XZRYj5voHjJnoWNAVpQO3GOsO+o6xcHQvaG+VrDS60cc/ox6/20Uk4lUqYWQ55dCRMGeM6SvLlnhnyGk7Stk7t5RzZwVHNmrMsM35HZ3qBHcerhzQTj/utHQ==" || undefined,
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
      *login({ payload = {} }, { put, select }) {
        const res = yield put({
          type: 'setToken',
          payload: {
            token: payload.token,
          }
        });
        try {
          const { closeLogin } = LOGIN_MODAL_THIS;
          closeLogin();
        } catch (e) {

        }
        return res
      },
      *logout({ payload = {} }, { put, select }) {
        const token = yield select(({ auth }: { auth: IModelState }) => auth.token);
        yield put({
          type: 'clearCache',
        });
        try {
          const { openLogin } = LOGIN_MODAL_THIS;
          console.log(LOGIN_MODAL_THIS)
          openLogin();
        } catch (e) {
          console.log(e)
        }
        return true;
      },
    },
}

export default authModel;
