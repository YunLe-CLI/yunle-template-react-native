import { Effect, Reducer } from '@/typings';
import theme from '@/utils/theme';

export interface IModelState {
    theme: {};
    token: string;
    orientation: string;
    appState: string;
};

export interface IModelType {
    namespace: string;
    state: IModelState;
    effects: {
        changeTheme: Effect;
        getTheme: Effect;
        saveToken: Effect;
        cleanToken: Effect;
    };
    reducers: {
        updateState: Reducer<IModelState>;
        saveTheme: Reducer<IModelState>;
        orientationChange: Reducer<IModelState>;
        appStateChange: Reducer<IModelState>;
    };
}

const Model: IModelType = {
    namespace: 'app',
    state: {
        theme: theme,
        token: '',
        appState: 'active',
        orientation: 'PORTRAIT',
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
        saveTheme(state, { payload }) {
            return { ...state, theme: { ...state.theme, ...payload } }
        },
        orientationChange(state, { orientation }) {
            return { ...state, orientation }
        },
        appStateChange(state, { appState }) {
            return { ...state, appState }
        }
    },
    effects: {
        *changeTheme({ payload = {} }, { put }) {
            yield put({ type: 'saveTheme', payload: { ...payload } });
        },
        *getTheme(_, { select }) {
            const theme: {} = yield select(({ app }: { app: IModelState }) => app.theme);
            return theme;
        },
        *saveToken({ payload = {} }, { put }) {
            yield put({ type: 'updateState', payload: { token: payload.token } });
        },
        *cleanToken({ payload = {} }, { put }) {
            yield put({ type: 'updateState', payload: { token: undefined } });
        },
    },
}

export default Model;
