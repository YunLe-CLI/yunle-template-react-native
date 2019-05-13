import React, { PureComponent } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import {Icon} from '@ant-design/react-native';

import HomePage from './pages/Home';
import DetailsPage from './pages/Details';

const AppTabNav = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={'home'}
                        size={26}
                    />
                ),
            }
        },
        Details: {
            screen: DetailsPage,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused }) => (
                    <Icon
                        name={'user'}
                        size={26}
                    />
                ),
            }
        },
    }
)

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: AppTabNav,
            navigationOptions: ({  navigation }) => ({
                header: null
            })
        },
    }, 
    {
        initialRouteName: 'Main',
        headerMode: 'screen'
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