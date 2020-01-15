import React from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Footer,
  Card,
  CardItem,
  Text,
  Item, Input, Form,
  Icon,
  Textarea,
} from 'native-base';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import VideoPlayer from '@/components/react-native-aliyun-vod-controls'
import Orientation, {OrientationType} from "react-native-orientation-locker";
import LinearGradient from "react-native-linear-gradient";

export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

  state = {
    orientationType: 'PORTRAIT',
    video: {
      videoUrl: '',
      videoWidth: undefined,
      height: undefined,
      duration: 0,
    }
  };

  renderForm() {
    return <View>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>姓名</Text>
          <Input value={this.state.loginName} style={styles.ipt} placeholder="请输入姓名" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     loginName: value,
                   })
                 }}
          />
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>身份证号</Text>
          <Input value={this.state.loginName} style={styles.ipt} placeholder="请输入身份证号" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     loginName: value,
                   })
                 }}
          />
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>性别</Text>
          <Input value={this.state.loginName} style={styles.ipt} placeholder="请选择性别" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     loginName: value,
                   })
                 }}
          />
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>出生日期</Text>
          <Input value={this.state.loginName} style={styles.ipt} placeholder="请选择出生日期" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     loginName: value,
                   })
                 }}
          />
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>年龄</Text>
          <Input value={this.state.loginName} style={styles.ipt} placeholder="请选择出生日期" placeholderTextColor={"#9C9EB9"}
                 onChangeText={(value) => {
                   this.setState({
                     loginName: value,
                   })
                 }}
          />
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>既往病史/过敏史</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <View style={{ flex: 1, flexGrow: 1, }}>
            <Textarea rowSpan={5} placeholderTextColor={'#CCD5E3'} placeholder="请输入您的既往病史/过敏" />
          </View>
        </CardItem>
      </Card>
    </View>
  }

  render() {
    const { orientationType } = this.state;
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
          }}
          onDidFocus={payload => {
          }}
          onWillBlur={payload => {
          }}
          onDidBlur={payload => {
          }}
        />
        <Header
          style={styles.header}
          translucent
        >
          <Left/>
          <Body>
            <Title style={styles.headerText}>完善个人信息</Title>
          </Body>
          <Right/>
        </Header>
        <StatusBar barStyle="dark-content" />
        <Content
          disableKBDismissScroll
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          {this.renderForm()}
        </Content>
        <Footer
          style={styles.footerWrap}
        >
          <View style={styles.btnWrap}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 1}}
              colors={['#6AE27C', '#17D397']}
              style={[
                styles.linearGradientBtn,
                {
                  opacity: this.state.password && this.state.loginName ? 1 : 0.4
                }
              ]}
            >
              <Button
                full
                transparent
                rounded
                onPress={async () => {
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'Home',
                    params: {},
                  }))
                }}
                style={styles.submitButton}
                textStyle={{
                  color: '#fff'
                }}
              >
                <Title>完成</Title>
              </Button>
            </LinearGradient>
          </View>
        </Footer>
      </Container>
    );
  }
}
export default Home;
