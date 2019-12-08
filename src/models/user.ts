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
      *getUser({ payload = {} }, { put }) {
        let token = yield getToken();
        const res = yield getUserInfo(token);
        const code: number = _.get(res, 'code', -1);
        const data: any = _.get(res, 'data', false);
        const createAt: number | boolean = _.get(data, 'createAt', false);
        if (code === 0 && createAt) {
          if (data && createAt) {
            yield put({
              type: 'setUser',
              payload: {
                user: data,
              }
            })
          }
        }
        return res;
      },
      *postFeedback({ payload = {} }, { put }) {
        let res = undefined;

        try {
          res = yield postFeedback({
            content: payload.content,
          });
          const code: number = _.get(res, 'code', -1);
          if (code === 0) {

          }
        } catch (e) {

        }

        return res;
      },
      *bindWx({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield bindWx({
            uid: payload.uid,
            screenName: payload.screenName,
            iconurl: payload.iconurl,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            gender: payload.gender,
            unionId: payload.unionId,
            openid: payload.openid,
            expiresIn: payload.expiresIn,
          });
          const code: number = _.get(res, 'code', -1);
          if (code === 0) {

          }
        } catch (e) {

        }

        return res;
      },
      *bindPhone({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield bindPhone({
            mobile: payload.mobile,
            vcode: payload.vcode,
          });
          const code: number = _.get(res, 'code', -1);
          if (code === 0) {

          }
        } catch (e) {

        }

        return res;
      },
    },
}

export default userModel;
