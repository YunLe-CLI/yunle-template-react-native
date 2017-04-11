import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Route } from 'react-router-native';
import AppActions from './actions';
import styles from './assets/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	Text,
	View,
} from 'react-native';

class App extends Component {
  state = {
    __data__: fromJS({}),
  };
  static propTypes = {
    state: PropTypes.object,
    actions: PropTypes.object
  };
  render() {
    const { history, actions, state } = this.props;
    const { loading, loadingTxt, globalModal } = state.get('app').toJS();
    return (
	    <View style={styles.container}>
				<Route path="/" render={() => (
					<Icon.Button name="home" backgroundColor="#3b5998">
						<Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>Home</Text>
					</Icon.Button>
				)}/>
	    </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
	const actions = {};
	for (let i in AppActions) {
		actions[i] = bindActionCreators({ ...AppActions[i] }, dispatch);
	}
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
