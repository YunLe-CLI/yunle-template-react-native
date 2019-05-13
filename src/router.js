import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Details from './pages/Details';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        Details: {
            screen: Details,
        },
    }, 
    {
        initialRouteName: 'Home',
    }
);


export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
    state => state.router,
    'root'
)

const App = createReduxContainer(AppNavigator, 'root')

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
    render() {
        const { app, dispatch, router } = this.props
        // if (app.loading) return <Loading />
        return <App dispatch={dispatch} state={router} />
    }
}

export default Router;