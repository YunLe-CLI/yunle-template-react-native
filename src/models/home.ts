import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import Toast from 'react-native-root-toast';
import _ from "lodash";
import { getHome, getHomeItem } from '@/services/api';

export interface IModelState {
  info: {},
  list: {} | undefined,
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
}

const homeModel: IModelType = {
    namespace: 'home',
    state: {...initState},
    reducers: {
      clearCacheHandle() {
        return { ...initState }
      },
      setInfo(state, { payload }) {
          return { ...state,
            info: payload.info,
          }
      },
      setList(state, { payload }) {
        return { ...state,
          list: {
            ...state.list,
            ...payload,
          },
        }
      },
    },
    effects: {
      *clearCache({ payload = {} }, { put }) {
        yield put({ type: 'clearCacheHandle' });
      },
      *getHome({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getHome({});
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          const list = _.get(data, 'list', undefined);
          if (code === 0) {
            if (_.isArray(list)) {
              const info = {};
              list.forEach((item: any) => {
                info[item.code] = {
                  ...item,
                };
              })
              yield put({
                type: 'setInfo',
                payload: {
                  info,
                }
              })
            }
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取商业画布失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getHomeItem({ payload = {} }, { put }) {
        let res = undefined;
        try {
          console.log(payload)
          res = yield getHomeItem({
            page: 1,
            perpage: 10,
            businessCanvasCode: _.toNumber(payload.businessCanvasCode),
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {
            yield put({
              type: 'setList',
              payload: {
                [payload.businessCanvasCode]: data,
              },
            });
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取商业画布详情失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show("暂无数据", {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
    },
}

export default homeModel;
