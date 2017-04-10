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

export default class __template__ extends Component {
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
		const { testTemplate, testFetchTemplate } = actions.__template__;
		const { globalModal, text, async } = state.get('__template__').toJS();
		return (
			<View>
				<View>
					<Link to="/" underlayColor='#f0f4f7'>
						<Text>__template__</Text>
					</Link>
				</View>
			</View>
		);
	}
}

