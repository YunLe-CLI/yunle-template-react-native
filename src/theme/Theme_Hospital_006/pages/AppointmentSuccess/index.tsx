import React from 'react';
import {StatusBar, Dimensions, View, ImageBackground} from 'react-native';
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
import bg from '@/theme/Theme_Hospital_006/components/LoginModal/assets/bg/bg.png';
import {getStatusBarHeight} from "react-native-status-bar-height";

export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect(({ user, home = {} }) => {
  return {
    postType: home.postType,
    user
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
    const { navigation, user = {} } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo: DOCTOR_ITEM = params.doctorInfo || {};
    const time = params.time;
    return <View>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>{this.props.postType || '挂号'}信息</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生姓名: </Text>
          <Text style={styles.ipt}>
            {doctorInfo.name}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生职称: </Text>
          <Text style={styles.ipt}>
            {doctorInfo.professionalTitle}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>所在医院: </Text>
          <Text style={styles.ipt}>
            {doctorInfo.hospitalName}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊科室: </Text>
          <Text style={styles.ipt}>
            {doctorInfo.medicalDepartment}
          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>就诊人信息</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊人: </Text>
          <Text style={styles.ipt}>
            {user.name}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>身份证号: </Text>
          <Text style={styles.ipt}>
            {user.idCard}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>手机号: </Text>
          <Text style={styles.ipt}>
            {user.mobile}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊时间: </Text>
          <Text style={styles.ipt}>
            {time}
          </Text>
        </CardItem>
      </Card>
      <View style={styles.btnWrap}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          colors={['#6093FB', '#6093FB']}
          style={[
            styles.linearGradientBtn,
          ]}
        >
          <Button
            full
            transparent
            rounded
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
              color: '#fff'
            }}
          >
            <Title>返回首页</Title>
          </Button>
        </LinearGradient>
      </View>
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
        <ImageBackground
          source={bg}
          style={{
            flex: 1,
            flexGrow: 1,
            width: '100%',
          }}
        >
          <View style={{
            marginTop: getStatusBarHeight(true),
            height: 108,
            paddingBottom: 18,
            justifyContent: 'center',
          }}>
            <Header
              style={[styles.header, {
                marginTop: -getStatusBarHeight(true),
              }]}
              translucent
              transparent
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
                <Title style={styles.headerText}>支付成功</Title>
              </Body>
              <Right/>
            </Header>
          </View>
          <View
            style={{
              marginTop: -18,
              // paddingHorizontal: 32.5,
              flex: 1,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}
          >
            <StatusBar barStyle="dark-content" />
            <Content
              disableKBDismissScroll
              style={styles.body}
              contentContainerStyle={styles.bodyContent}
            >
              <Text style={[styles.ipt, styles.successText, {
                paddingHorizontal: 27,
                paddingTop: 27,
              }]}>
                您已支付成功
              </Text>
              {this.renderForm()}
            </Content>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default Home;
