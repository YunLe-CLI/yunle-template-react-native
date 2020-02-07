import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import Toast from 'react-native-root-toast';
import _ from "lodash";
import { getHome, getHomeItem } from '@/services/api';

export interface IModelState {
  info: {},
  list: {} | undefined,
  postType: string;
};

export interface IModelType extends Model{
  namespace: string;
  state: IModelState;
  effects: {
    clearCache: Effect | EffectWithType;
    getHome: Effect | EffectWithType;
    getHomeItem: Effect | EffectWithType;
  };
  reducers: {
    clearCacheHandle: Reducer<IModelState>;
    setInfo: Reducer<IModelState>;
    setList: Reducer<IModelState>;
  };
}

const initState: IModelState = {
  info: {},
  list: undefined,
  postType: '',
}

const homeModel: IModelType = {
    namespace: 'home',
    state: {...initState},
    reducers: {
      clearCacheHandle() {
        return { ...initState }
      },
      setPostType(state, { payload }) {
        return { ...state, postType: payload }
      }
    },
    effects: {
      *clearCache({ payload = {} }, { put }) {
        yield put({ type: 'clearCacheHandle' });
      },
    },
}

export default homeModel;
