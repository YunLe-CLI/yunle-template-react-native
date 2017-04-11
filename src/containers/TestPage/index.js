import React, { Component, PropTypes }  from 'react'
import { is, fromJS } from 'immutable';
import { NativeRouter, Route, Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './assets/style';

import {
	StyleSheet,
	Text,
	View,
	AppRegistry,
} from 'react-native'

import { Button } from 'antd-mobile';

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
		const { history, actions, state } = this.props;
		const { testTemplate, testFetchTemplate } = actions.TestPage;
		const { globalModal, text, async } = state.get('TestPage').toJS();
		return (
			<View>
				<View>
					<Text>TestPage</Text>
					<View>
						<Icon.Button onClick={() => history.push('/')} name="home" backgroundColor="#3b5998">
							<Link to="/" underlayColor='#f0f4f7'>
								<Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>Home</Text>
							</Link>
						</Icon.Button>
					</View>
				</View>
			</View>
		);
	}
}

