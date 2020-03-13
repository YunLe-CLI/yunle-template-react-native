import React from 'react';
import {  View } from 'react-native';
import {Accordion, Container, Header, Content, Footer, Button, Title, Text, Body} from 'native-base';
import styles from './styles';
import LottieView from "lottie-react-native";
import animateData from "./assets/6638-not-found.json";
import CodePush from "react-native-code-push";

export interface IProps {
  errorInfo: undefined | {};
}
export interface IState {

}

class ErrorView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  onReload = () => {
    try {
      setTimeout(() => {
        CodePush.restartApp();
      }, 300);
    } catch (e) {
      // alert(e)
    }
  }

  render() {
    const { errorInfo } = this.props;
    console.log(errorInfo)
    return (
      <Container style={[styles.container, {
        backgroundColor: '#11CD8F'
      }]}>
        <Header transparent>
          <Body>
            <Title>APP发生错误</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={{
          flex: 1,
        }}>
          <View style={styles.content}>
            <View style={{
              flexGrow: 1,
              paddingHorizontal: 12,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View style={{
                flex: 1,
                marginTop: 100,
              }}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>
                  <LottieView
                      style={styles.lottie}
                      autoPlay
                      loop
                      source={animateData}
                      onAnimationFinish={async () => {

                      }}
                  />
                </View>
                <View style={styles.btn}>
                  <Button
                      rounded
                      onPress={this.onReload}
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        backgroundColor: '#fff'
                      }}
                  >
                    <Text style={{ color: '#000' }}>刷新APP</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.Accordion}>
              <Accordion dataArray={[
                {
                  title: "错误祥情",
                  content: errorInfo ? JSON.stringify(errorInfo) : '未知错误！'
                }
              ]} expanded={0}/>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ErrorView;

