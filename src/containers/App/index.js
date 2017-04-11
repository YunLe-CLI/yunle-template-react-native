import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import route from './route';
import { Route, Link } from 'react-router-native';
import AppActions from './actions';
import styles from './assets/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'antd-mobile';
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
		    <Button className="btn" onClick={
			    ()=>{
				    history.push('/TestPage')
			    }
		    } type="primary">
			    <Text style={{fontFamily: 'Arial', fontSize: 15, color: '#fff'}}>go /TestPage</Text>
		    </Button>
		    {route.childRoutes.map((item) => RouteWithSubRoutes(item, {actions, state}))}
	    </View>
    );
  }
}
function RouteWithSubRoutes(route = {}, reduxState = {}) {
	return (<Route key={`route-${route.path}`} path={route.path} render={(props) => (
		<route.component {...props} {...reduxState} routes={route.path}/>
	)}/>);
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
