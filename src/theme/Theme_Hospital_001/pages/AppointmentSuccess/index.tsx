import React from 'react';
import {StatusBar, Dimensions, View} from 'react-native';
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
import Orientation, {OrientationType} from "react-native-orientation-locker";
import LinearGradient from "react-native-linear-gradient";
import FastImage from 'react-native-fast-image';
import icon from './assets/icon_left_slices/icon_left.png';
import pic_sce from './assets/pic_sce_slices/pic_sce.png';
import {DOCTOR_ITEM} from '../../services/api';

export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect(({ user }) => {
  return {
    user: user.info,
    postType: home.postType
  }
}) as any)
class Home extends React.Component<IProps, IState> {

  state = {
    orientationType: 'PORTRAIT',
    video: {
      videoUrl: '',
      videoWidth: undefined,
      height: undefined,
      duration: 0,
    },
    payType: 'wx',
  };

  renderForm() {
    const { navigation, user } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo: DOCTOR_ITEM = params.doctorInfo || {};
    const time = params.time;
    return <View>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>{this.props.postType || '挂号'}信息</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={[styles.ipt, { color: '#404E66', fontWeight: '500' }]}>
            {time}
          </Text>
          <View style={{ width: 12.5, }}></View>
          <Text style={[styles.ipt, { color: '#F86358', fontWeight: '600' }]}>
            {doctorInfo.medicalDepartment}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={[styles.ipt, { color: '#888888' }]}>
            {doctorInfo.hospitalName}
          </Text>
          <View style={{ width: 12.5, }}></View>
          <Text style={[styles.ipt, { color: '#888888' }]}>
            {doctorInfo.professionalTitle}
          </Text>
          <View style={{ width: 12.5, }}></View>
          <Text style={[styles.ipt, { color: '#888888' }]}>
            {doctorInfo.name}
          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>就诊人信息</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={[styles.formItemLabel, { color: '#404E66', fontWeight: '600' }]}>
            {user.name}
          </Text>
          <Text style={[styles.ipt, { color: '#404E66', fontWeight: '600' }]}>
            {user.mobile}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>身份证号</Text>
          <Text style={styles.ipt}>
          {user.idCard}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>看诊疾病</Text>
          <Text style={styles.ipt}>
            {params.remark}
          </Text>
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
          <Left
          >
            <Button
              transparent
              onPress={() => {
                const { dispatch } = this.props;
                dispatch(NavigationActions.back());
              }}
            >
              <FastImage
                style={{
                  marginLeft: 16,
                  width: 20,
                  height: 20,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={icon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerText}>{this.props.postType || '挂号'}成功</Title>
          </Body>
          <Right/>
        </Header>
        <StatusBar barStyle="dark-content" />
        <Content
          disableKBDismissScroll
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          <Card noShadow style={styles.formCard}>
            <CardItem style={[styles.formItem, styles.success]}>
              <FastImage
                style={{
                  marginTop: 24,
                  marginBottom: 16,
                  width: 78,
                  height: 78,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={pic_sce}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.ipt, styles.successText]}>
                您已{this.props.postType || '挂号'}成功
              </Text>
            </CardItem>
          </Card>

          {this.renderForm()}
        </Content>
        <Footer
          style={styles.footerWrap}
        >
          <Button
            full
            transparent
            onPress={async () => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'Home',
                params: {
                  active: 0,
                },
              }))
            }}
            style={styles.submitButton}
            textStyle={{
              color: '#F57260'
            }}
          >
            <Title style={{ color: '#F57260' }}>返回首页</Title>
          </Button>
        </Footer>
      </Container>
    );
  }
}
export default Home;
