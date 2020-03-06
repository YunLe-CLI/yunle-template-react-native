import { Reducer } from 'redux';
import { Effect, Subscription } from 'dva';
import _ from 'lodash';
import {touristsAccount} from '@Global/utils/config';

export interface UserModelState {
  isTouristsAccount: boolean;
  info: {} | undefined;
};

export interface UserModelType {
    namespace: 'user',
    state: UserModelState;
    effects: {
      clearCache: Effect;
      setUserAsync: Effect;
    };
    reducers: {
      clearCacheHandle: Reducer<UserModelState>;
      setUser: Reducer<UserModelState>;
    };
    subscriptions: { setup: Subscription };
}

const initState: UserModelState = {
  isTouristsAccount: false,
  info: undefined,
}

const userModel: UserModelType = {
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
      *setUserAsync({ payload = {} }, { put }) {
        yield put({ type: 'setUser', payload: { user: payload.user }});

      },
    },
    subscriptions: {
      setup: () => {}
    },
}

export default userModel;
