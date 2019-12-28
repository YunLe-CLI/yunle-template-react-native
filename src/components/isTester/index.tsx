import React from 'react';
import {Dimensions, Text} from "react-native";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import { Button, Icon, Fab } from 'native-base';
import CodePush from 'react-native-code-push';
// @ts-ignore
import Draggable from 'react-native-draggable';
import {LoginConsumer} from "@/components/LoginModal";


interface IProps {}

interface IState {
  active: boolean,
}
@(connect() as any)
class IsTester extends React.PureComponent<IProps, IState> {

  player: any;

  state = {
    active: false,
  };

  goToSetting= () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Setting',
      params: {},
    }));
  };
  render() {
    return <Draggable x={Dimensions.get('window').width} y={Dimensions.get('window').height - 100}>
      <LoginConsumer>
        {
          ({ openLoginModal }) => {
            return (
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#D32929' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
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
                          onPress={() => {
                            CodePush.restartApp();
                          }}
                  >
                    <Icon name="color-palette" />
                  </Button>
                  <Button style={{ backgroundColor: '#D32929' }}
                          onPress={() => {
                            throw new Error('12')
                          }}
                  >
                    <Icon name="bug" />
                  </Button>
                  <Button
                      onPress={() => {
                        const { dispatch } = this.props;
                        dispatch({
                          type: 'auth/logout'
                        });
                        openLoginModal();
                      }}
                  >
                    <Icon name="log-out" />
                  </Button>
                </Fab>
            )
          }
        }
      </LoginConsumer>
    </Draggable>
  }
}

export default IsTester;
