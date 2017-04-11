import React, { Component, cloneElement } from 'react';
import { Provider } from 'react-redux';
import routes from '../router';
import App from '../containers/App';
import configureStore from '../store';
import SplashScreen from 'react-native-splash-screen';
import { NativeRouter, Route } from 'react-router-native';
import PageConfig from '../containers/config';

const store = configureStore();
/* global someFunction window:true */
/* eslint-disable no-underscore-dangle */
export default class Root extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}
	render() {
		const A = PageConfig[0].page;
		return (
      <Provider store={store}>
	      <NativeRouter>
		      <Route path="/" render={(props) => (
		        <App {...props} /> )}
		      />
	      </NativeRouter>
      </Provider>
		);
	}
}

