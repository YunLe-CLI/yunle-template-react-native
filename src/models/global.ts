import { Reducer } from 'redux';
import { AppState, AppStateStatus } from 'react-native';
import { Subscription, Effect } from 'dva';
import { Mode, eventEmitter, initialMode } from 'react-native-dark-mode'
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { ENVIRONMENT, BUILD_TYPE } from '@Global/utils/env';

export interface GlobalModelState {
  orientation: OrientationType;
  appState: AppStateStatus;
  appReloadNum: boolean;
  mode: Mode;
}

export interface GlobalModelType {
  namespace: 'global',
  state: GlobalModelState;
  effects: {
    clearCache: Effect;
  };
  reducers: {
    clearCacheHandle: Reducer<GlobalModelState>;
    appReload: Reducer<GlobalModelState>;
    orientationChange: Reducer<GlobalModelState>;
    appStateChange: Reducer<GlobalModelState>;
    setENV: Reducer<GlobalModelState>;
    setMode: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const INIT_STATE: GlobalModelState = {
  appState: 'active',
  orientation: Orientation.getInitialOrientation(),
  appReloadNum: false,
  mode: initialMode,
};

const GlobalModel: GlobalModelType = {
    namespace: 'global',
    state: { ...INIT_STATE },
    reducers: {
      clearCacheHandle() {
        return { ...INIT_STATE }
      },
      setENV(state, { payload }) {
        return {
          ...state,
          ENV: payload || ENVIRONMENT,
          BUILD_TYPE: BUILD_TYPE,
        }
      },
      orientationChange(state, { orientation }) {
        return { ...state, orientation }
      },
      appStateChange(state, { appState }) {
        return { ...state, appState }
      },
      appReload(state, { appReload }) {
        return { ...state, appReload: !!appReload }
      },
      setMode(state, { mode }) {
        return { ...state, mode }
      }
    },
    effects: {
        *clearCache({ payload = {} }, { put }) {
          yield put({ type: 'clearCacheHandle' });
        },
    },
    subscriptions: {
      setup: ({ dispatch }) => {
        function appStateListener(nextAppState: AppStateStatus) {
          dispatch({
            type: 'appStateChange',
            appState: nextAppState,
          });
        }
        function darkModeListener(newMode: Mode) {
          dispatch({
            type: 'setMode',
            mode: newMode,
          })
        }
        function orientationListener(orientation: OrientationType) {
          dispatch({
            type: 'orientationChange',
            orientation,
          })
        }
        eventEmitter.removeAllListeners('currentModeChanged');
        AppState.removeEventListener('change', appStateListener);
        Orientation.removeAllListeners();
        eventEmitter.on('currentModeChanged', darkModeListener);
        AppState.addEventListener('change', appStateListener);
        Orientation.addOrientationListener(orientationListener);
      }
    },
};

export default GlobalModel;
