import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { initialMode } from 'react-native-dark-mode'
import { clearThemeCache } from 'native-base-shoutem-theme';

import themes from '@Global/utils/themes';

export interface ThemeModelState {
  theme: any;
}

export interface ThemeModelType {
  namespace: 'theme',
  state: ThemeModelState;
  effects: {
    clearCache: Effect;
  };
  reducers: {
    clearCacheHandle: Reducer<ThemeModelState>;
    setTheme: Reducer<ThemeModelState>;
  };
  subscriptions: { setup: Subscription };
}

const INIT_STATE: ThemeModelState = {
  theme: themes[initialMode],
};

const GlobalModel: ThemeModelType = {
    namespace: 'theme',
    state: { ...INIT_STATE },
    reducers: {
      clearCacheHandle() {
        clearThemeCache();
        return { ...INIT_STATE }
      },
      setTheme(state, { theme }) {
        clearThemeCache();
        return { ...state, theme }
      }
    },
    effects: {
        *clearCache({ payload = {} }, { put }) {
          yield put({ type: 'clearCacheHandle' });
        },
    },
    subscriptions: {
      setup: ({ dispatch }) => {
        dispatch({
          type: 'setTheme',
          theme: themes[initialMode],
        })
      },
    }
};

export default GlobalModel;
