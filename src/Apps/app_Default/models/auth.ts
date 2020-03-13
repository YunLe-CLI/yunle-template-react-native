import { Reducer } from 'redux';
import { Effect, Subscription } from 'dva';
import { LOGIN_MODAL_THIS } from "../components/LoginModal";

export interface AuthModelState {
  token: string | undefined;
};

export interface AuthModelType {
    namespace: 'auth';
    state: AuthModelState;
    effects: {
      clearCache: Effect;
      checkLogin:Effect;
      login: Effect;
      logout: Effect;
    };
    reducers: {
      clearCacheHandle: Reducer<AuthModelState>;
      setToken: Reducer<AuthModelState>;
    };
    subscriptions: { setup: Subscription };
}

const initState: AuthModelState = {
  token: undefined,
}

const authModel: AuthModelType = {
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
        const token = yield select(({ auth }: { auth: AuthModelState }) => auth.token);
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
          if (closeLogin) {
            closeLogin();
          }
        } catch (e) {

        }
        return res
      },
      *logout({ payload = {} }, { put, select }) {
        yield put({
          type: 'clearCache',
        });
        try {
          const { openLogin } = LOGIN_MODAL_THIS;
          if (openLogin) {
            openLogin();
          }
        } catch (e) {
          console.log(e)
        }
        return true;
      },
    },
    subscriptions: {
      setup: () => {}
    },
}

export default authModel;
