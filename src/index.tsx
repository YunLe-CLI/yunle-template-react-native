import React, { PureComponent } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';
import Orientation from 'react-native-orientation-locker';
import { ThemeProvider } from 'react-native-elements';
import dva from '@/utils/dva';
import ApolloRoot from '@/utils/apollo';
import Router, { routerMiddleware, routerReducer } from '@/router';
import appModel from '@/models/app';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'app',
  ],
}

const dvaApp = dva({
    initialState: {},
    models: [appModel],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    "onReducer": (rootReducer:any) => persistReducer(persistConfig, rootReducer),
    "onError": (e: any) => {
        console.log('onError', e);
    },
});

const createPersist = (store: any) => {
  const persistor = persistStore(store)
  // persistor.dispatch({
  //     type: REHYDRATE
  // });
  return persistor
}



interface IMProps {
    theme: {};
}
export interface IConnect {
    app: {
        theme: {};
    };
}

const MainRouter = connect(
    (state: IConnect) => ({
        theme: state.app.theme
    }),
)(
    class extends PureComponent<IMProps> {
        componentDidMount(): void {
            RNBootSplash.hide({ duration: 300 });
        }

        render() {
            const { theme } = this.props;
            return (
                <ThemeProvider theme={theme}>
                    <Router />
                </ThemeProvider>
            );
        }
    }
)


interface IAPPProps {}
class App extends PureComponent<IAPPProps> {
    constructor(props: IAPPProps) {
        super(props);
        const { dispatch } = dvaApp._store;
        Orientation.lockToPortrait();
        const initial = Orientation.getInitialOrientation();
        if (dispatch) {
            dispatch({
                type: 'app/orientationChange',
                orientation: initial,
            })
        }
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
        AppState.addEventListener('change', this._handleAppStateChange);

        Orientation.addOrientationListener(this._onOrientationDidChange);

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState: string) => {
        const { dispatch } = dvaApp._store;
        dispatch({
            type: 'app/appStateChange',
            appState: nextAppState,
        })
    }

    _onOrientationDidChange = (orientation: string) => {
        console.log(orientation)
        const { dispatch } = dvaApp._store;
        dispatch({
            type: 'app/orientationChange',
            orientation,
        })
        if (orientation == 'LANDSCAPE-LEFT') {
            //do something with landscape left layout
        } else {
            //do something with portrait layout
        }
    };


    render() {
        return (
            <ApolloRoot>
                <PersistGate persistor={createPersist(dvaApp._store)} loading={null}>
                    <MainRouter />
                </PersistGate>
            </ApolloRoot>
        );
    }
}


// @ts-ignore
export default dvaApp.start(<App />);
