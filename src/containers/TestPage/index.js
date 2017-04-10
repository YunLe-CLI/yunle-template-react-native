import React, { Component, PropTypes }  from 'react'
import { is, fromJS } from 'immutable';
import { NativeRouter, Route, Link } from 'react-router-native'
import styles from './assets/style';

import {
	StyleSheet,
	Text,
	View,
	AppRegistry,
} from 'react-native'

// import { Button } from 'antd-mobile';

export default class TestPage extends Component {
	state = {
		__data__: fromJS({}),
		collapsed: false,
	};
	static propTypes = {
		routing: PropTypes.object,
		actions: PropTypes.object
	};
	shouldComponentUpdate(nextProps = {}, nextState = {}) {
		const thisProps = this.props || {}, thisState = this.state || {};
		if (!is(thisProps.state, nextProps.state)) {
			return true;
		}
		if (!is(thisState.__data__, nextState.__data__)) {
			return true;
		}
		return false;
	}
	render() {
		const { actions, state } = this.props;
		console.log(this.props)
		// const { testTemplate, testFetchTemplate } = actions.TestPage;
		// const { globalModal, text, async } = state.get('TestPage').toJS();
		return (
			<View>
				<View>
					<Link to="/" underlayColor='#f0f4f7'>
						<Text>Home</Text>
					</Link>
				</View>
			</View>
		);
	}
}

