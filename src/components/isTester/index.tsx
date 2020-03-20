import React from 'react';
import {View, Dimensions, Text} from "react-native";
import {connect} from "react-redux";
import { NavigationActions } from "@react-navigation/compat";
import { Button, Icon, Fab } from 'native-base';
import CodePush from 'react-native-code-push';
// @ts-ignore
import Draggable from 'react-native-draggable';
import _ from 'lodash';
import {withSelectAppModal} from '@Global/components/SelectAppModal';
import {withSelectThemeModal} from '@Global/components/SelectThemeModal';
import ActionButton from 'react-native-action-button';

interface IProps {}

interface IState {
  active: boolean,
}
@(connect() as any)
class IsTester extends React.PureComponent<IProps, IState> {

  player: any;

  state = {
    active: false,
    x: undefined,
    y: undefined,
    height: undefined,
  };

  goToSetting= () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Setting',
      params: {},
    }));
  };
  render() {
    const { x, y } = this.state;
    const { width, height } = Dimensions.get('window');
    const defaultX = width - 50;
    const defaultY = height - 150;
    return  <ActionButton
        size={56}
        buttonColor="rgba(231,76,60,1)"
        offsetX={10}
        offsetY={100}
        style={{
          position: 'absolute',
          zIndex: 999,
        }}
        renderIcon={() => <Icon style={{ color: '#fff' }} name="bug" />}
      >
        <ActionButton.Item
          buttonColor='#9b59b6'
          title="刷新"
          onPress={() => {
            CodePush.restartApp();
          }}
        >
          <Icon style={{ color: '#fff' }} name="refresh" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#3498db'
          title="Apps"
          onPress={() => {
            this.props.handleShowSelectAppModal()
          }}
        >
          <Icon style={{ color: '#fff' }} name="ios-apps" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#FABB2D'
          title="主题"
          onPress={() => {
            this.props.handleShowSelectThemeModal()
          }}
        >
          <Icon style={{ color: '#fff' }} name="color-palette" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#1abc9c'
          title="退出"
          onPress={() => {
            const { dispatch } = this.props;
            dispatch({
              type: 'auth/logout'
            });
          }}
        >
          <Icon style={{ color: '#fff' }} name="log-out" />
        </ActionButton.Item>
      </ActionButton>
  }
}

export default withSelectThemeModal(withSelectAppModal(IsTester));
