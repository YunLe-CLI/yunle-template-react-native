import React, { PureComponent } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
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

const MainRouter = connect((state: IConnect):IMProps => ({ theme: state.app.theme }))(
    class extends PureComponent<IMProps> {
        render() {
            return (
                <Router />
            );
        }
    }
)


interface IAPPProps {}
class App extends PureComponent<IAPPProps> {

    componentDidMount() {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
        AppState.addEventListener('change', this._handleAppStateChange);
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


export default dvaApp.start(<App />);
