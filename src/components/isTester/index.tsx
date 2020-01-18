import React from 'react';
import {View, Dimensions, Text} from "react-native";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import { Button, Icon, Fab } from 'native-base';
import CodePush from 'react-native-code-push';
// @ts-ignore
import Draggable from 'react-native-draggable';
import _ from 'lodash';
import AsyncStorage from "@react-native-community/async-storage";
import {withSelectThemeModal} from '@/components/SelectThemeModal';


interface IProps {}

interface IState {
  active: boolean,
}
@(connect() as any)
class IsTester extends React.PureComponent<IProps, IState> {

  player: any;

  state = {
    active: false,
    height: undefined,
  };

  goToSetting= () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Setting',
      params: {},
    }));
  };
  render() {
    return <Fab
      active={this.state.active}
      direction="up"
      containerStyle={{ }}
      style={{ backgroundColor: '#D32929' }}
      position="bottomRight"
      onPress={() => {
        this.setState({
          active: !this.state.active,
          // height: this.state.height ? undefined : 1000,
        })
      }}>
      <Icon name="bug" />
      <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => {
                this.goToSetting()
              }}
      >
        <Icon name="hammer" />
      </Button>
      <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => {
                CodePush.restartApp();
              }}
      >
        <Icon name="refresh" />
      </Button>
      <Button style={{ backgroundColor: '#34A34F' }}
              onPress={async () => {
                this.props.handleShowSelectThemeModal()
              }}
      >
        <Icon name="color-palette" />
      </Button>
      <Button
        onPress={() => {
          const { dispatch } = this.props;
          dispatch({
            type: 'auth/logout'
          });
        }}
      >
        <Icon name="log-out" />
      </Button>
    </Fab>
  }
}

export default withSelectThemeModal(IsTester);
