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

@(connect(({ user, home }) => {
  return {
    postType: home.postType,
    user: user.info,
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
      <CardItem style={[styles.formItem, {
          backgroundColor: 'transparent'
        }]}>
          <View>
            <Text style={styles.formItemTitle}>{this.props.postType || '挂号'}信息</Text>
            <View style={{
                position: 'absolute',
                left: 0,
                bottom: 2,
                right: 0,
                height: 3,
                opacity: .7,
                backgroundColor: '#24CFBC'
              }}>

            </View>
          </View>
        </CardItem>
        <View style={[styles.formItem, {
          paddingVertical: 0,
          marginBottom: 15,
          borderRadius: 10,
          shadowColor: '#272727',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          
          paddingLeft: 0,
        }]}>
          <View style={{
            borderRadius: 10,
            overflow: 'hidden',
          }}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生姓名</Text>
          <Text style={styles.ipt}>
            {doctorInfo.name}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生职称</Text>
          <Text style={styles.ipt}>
            {doctorInfo.professionalTitle}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>所在医院</Text>
          <Text style={styles.ipt}>
            {doctorInfo.hospitalName}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊科室</Text>
          <Text style={styles.ipt}>
            {doctorInfo.medicalDepartment}
          </Text>
        </CardItem>
        </View>
        </View>
      </Card>


      <Card noShadow style={styles.formCard}>
      <CardItem style={[styles.formItem, {
          backgroundColor: 'transparent'
        }]}>
          <View>
            <Text style={styles.formItemTitle}>就诊人信息</Text>
            <View style={{
                position: 'absolute',
                left: 0,
                bottom: 2,
                right: 0,
                height: 3,
                opacity: .7,
                backgroundColor: '#24CFBC'
              }}>

            </View>
          </View>
        </CardItem>
        <View style={[styles.formItem, {
          paddingVertical: 0,
          marginBottom: 15,
          borderRadius: 10,
          shadowColor: '#272727',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          
          paddingLeft: 0,
        }]}>
          <View style={{
            borderRadius: 10,
            overflow: 'hidden',
          }}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊人</Text>
          <Text style={styles.ipt}>
            {user.name}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>身份证号</Text>
          <Text style={styles.ipt}>
            {user.idCard}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>手机号码</Text>
          <Text style={styles.ipt}>
          {user.mobile}
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊时间</Text>
          <Text style={styles.ipt}>
            {time}
          </Text>
        </CardItem>
        </View>
        </View>
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
            <CardItem style={[styles.formItem, styles.success, {
              backgroundColor: 'transparent'
            }]}>
              <FastImage
                style={{
                  marginTop: 24,
                  marginBottom: 16,
                  width: 98,
                  height: 98,
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
          <View style={styles.btnWrap}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 1}}
              colors={['#1457FF', '#1457FF']}
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
        </Footer>
      </Container>
    );
  }
}
export default Home;
