import React from 'react';
import {ScrollView,NativeModules, View } from 'react-native';
import {Accordion, Container, Header, Content, Button, Title, Text} from 'native-base';
import styles from './styles';
import LottieView from "lottie-react-native";
import animateData from "./assets/6638-not-found.json";

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
      const { DevMenu } = NativeModules;
      DevMenu.reload();
    } catch (e) {
      alert(e)
    }
    console.log(NativeModules)
  }

  render() {
    const { errorInfo } = this.props;
    console.log(errorInfo)
    return (
      <Container style={styles.container}>
        <Header>
          <Title>
            APP发生错误
          </Title>
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={styles.content}>
            <View style={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={styles.lottie}>
                <LottieView
                    style={styles.lottie}
                    autoPlay
                    loop
                    source={animateData}
                    onAnimationFinish={async () => {

                    }}
                />
                <Title>刷新123</Title>
              </View>

              <View style={styles.btn}>
                <Button
                    rounded
                    onPress={this.onReload}
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                >
                  <Text>刷新</Text>
                </Button>
              </View>
            </View>
            <View style={styles.Accordion}>
              <Accordion dataArray={[
                {
                  title: "错误祥情",
                  content: errorInfo && errorInfo.componentStack ? errorInfo.componentStack : '未知错误！'
                }
              ]} style={{ width: '100%' }} expanded={0}/>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ErrorView;

