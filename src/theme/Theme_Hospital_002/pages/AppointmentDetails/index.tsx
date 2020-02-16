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
  List,
  ListItem,
} from 'native-base';
import Modal from "react-native-modal";
import styles from './styles';
import {NavigationActions, NavigationEvents, StackActions} from 'react-navigation';
import LinearGradient from "react-native-linear-gradient";
import FastImage from 'react-native-fast-image';
import XPay from 'react-native-puti-pay';
import icon from './assets/icon_left_slices/icon_left.png';
import icon_wx from './assets/icon_wx_slices/icon_wx.png';
import icon_zfb from './assets/icon_zfb_slices/icon_zfb.png';
import icon_check_active from './assets/icon_check_active_slices/icon_check_active.png';
import icon_check_default from './assets/icon_check_default_slices/icon_check_default.png';

import {DOCTOR_ITEM, MAKE_POST} from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import aliSign from '@/utils/aliSign';
import moment from 'moment';
export interface IProps {}

export interface IState {
  remark: string;
  payType: string;
}

@(connect(({ user, home }) => {
  return {
    postType: home.postType,
    user: user.info,
  }
}) as any)
class Home extends React.Component<IProps, IState> {

  state: IState = {
    remark: undefined,
    payType: 'wx',
    isModalVisible: false,
  };

  async postData(time: string) {
    try {
      const { navigation, user } = this.props;
      const { params = {} } = navigation.state;
      const registration_id = params.registration_id || '';
      const doctorInfo = params.doctorInfo || {};
      const time = params.time;
      const res = await MAKE_POST({
        registration_id,
        remark: this.state.remark,
        patientId: user.id,
      })
      if (res.code === 0) {
        this.props.dispatch(StackActions.replace({
          routeName: 'AppointmentSuccess',
          params: {
            doctorInfo,
            time
          },
        }))
        return;
      }
      throw res.msg
    } catch (e) {
      alert(e)
    }
  }


  handlePay = () => {
    const { payType } = this.state;
    //这些参数都是由后台生成的
     //设置    支付宝URL Schemes
     XPay.setAlipayScheme('ysxdemo0000hospital002')
     //支付宝开启沙箱模式 仅限安卓
     XPay.setAlipaySandbox('isSandBox')
     //支付宝支付
     //orderInfo是后台拼接好的支付参数
     const sign = '-----BEGIN RSA PRIVATE KEY-----\n' + `MIIEogIBAAKCAQEAgJE0gxIdi5wWomyeNymbZsJugIE1aTD6V4wJD/15MjcQ7W/uje9bx9v/4q51xGCIEA0GHqBTM3N4b3joXTaD68rc8/8uu0zl7S+QPOcrqcRdYbyBoCBywt4W73RpmyMr4QQ7h9laMp7n9cIuVfWaZU1lFHDcEJJPDjPnxYa4SOypnaJoUDmxTyqPl4jciS8tlPnhTZza0ICsnUvXD5fOFN7fpBf5UVBimQbSBBAhA2eefD3CPl976+nhFrMGTTulQuhDTgFfeftSHmncGttr/GDwlUg87HGKShrdWWyJD4bQYHpH4Eu+5X9V/sdgNMzD4NlQ4BPnaqP/juwn8NPN+wIDAQABAoIBAClG9VYTjdrR3U5+kvlg6Vy/ldy6HxzLtcQ/2HUCy1N87Hle03dMXuo2ztvHaVYILAcDN3DDxpKhQwx/BBNROl+MvQ21YxqNYNCa0bNMAO+7dMO5UuDHKjE4PqLYfENrsl3HDxnZhaT08cIsetXsSYq2o3pBldXYM3t63LHFRAtdQ6AX8wNqn9C6dMEwpqV10EJNL2zMAcxYqosjTddrqVWTsDeiHbvmiAtUVPBzs9erGtZ/cdKC5EMBXY5EyQUrnxUY289Lb8uDpIVj0qpN10kK0gT/8ol8XMR4fe12sO9k/s/qzSw1FZvWbtCANjEB/wCF4YIpcFTEXVKTihERDwECgYEAvrhiLuUQ6jfVLqwA4h7IsA95wnX/iYaadF9HVyD78dthvvNnpkVb70Y1DosOVvFGWgbsVRaIuAnm/6a6wNakZ8I/px4HagmgnJjAolZMHTnFq4JUgZ6K6n/kjAlz3S2Buf9FTIrBUxC+dtBc2R8UtiJoqMFYE/04mXOiaKlsOXsCgYEArJK9yJeVmzB3dsBe8RtSv0Tgqq/P2dG/TLiiumu8yVCIQ0OcK/3HBUb25KRM8ImYe6OiIvOJpKC3jLNbbTZkL4OnAVb0oO3vFPIAYytsW4+dUCXfKdJQAl3gZDIYM+TFOMaun6Ip4WlFpsb2UJyb76+PxELbekqgXAiEOYwPVYECgYA6PjjNtWqa/H4ACMskQt5q1e8LMdnd99tHWqmAtDP8wlBxbgfjQR84TSp6zICOkJQ5fg/CVGVgPrXqsNIrfeErRqkFsif1fAcui3+Yk94etrvlCqIgC3jE8FWtZl2Z2AHb+VcCbwVnBqADzNHuBI3gqVVo49KwGA6m3idk6wh/7QKBgEibvQoG7UVMURc/vTKIonojSrvGGRe2blyjWqRA7D9viMV0TuMbdX886mgs0MpruiJbKL635PPFQzUJya/bsK9lHwErSuXi9jLD13HiNUcY18F/DbQU7uDwCpddlF1RJcHLpnE305MprcqL79re6aUhIsYasyly+KGAW9GyokkBAoGAeTP32ER/N5k7U6ZbEK8fV7Ovp0Kc6lcoHP6TFrAyXLLO9j4CFlpMJiuejrIoZqZ4Z+mWg9eq7puZ8hLCBgVGMH5rTzdmb4hKGuHg52G5eVrP00SRrYyVXbqEzUPkR4GFyhN01EtzkAQyQlqd2b0lel2GmNo6Ffoq9YxvPAuLV6E=` + '\n-----END RSA PRIVATE KEY-----';
     console.log('支付宝支付', 11111)
     const signData = {
      app_id: 2016082201783549,
      biz_content: `{"timeout_express":"30m","seller_id":"","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"IQJZSRC1YMQB5HU"}`,
      method: 'alipay.trade.app.pay',
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      version: '1.0',
     }
     const data = aliSign(signData, sign)
     console.log('支付宝支付', data)
     XPay.alipay(data, (res)=> {
        // alert(res)
     })
    // XPay.wxPay(params,(res)=> {
    //   alert(JSON.stringify(res))
    //   // this.postData()
    // })
    this.postData()
    return;
    try {
      if (payType === 'wx') {
        //设置微信ID

      }
      if (payType === 'ali') {
        //设置    支付宝URL Schemes
        XPay.setAlipayScheme('scheme')
        //支付宝开启沙箱模式 仅限安卓
        XPay.setAlipaySandbox('isSandBox')
        //支付宝支付
        //orderInfo是后台拼接好的支付参数
        XPay.alipay('app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D', (res)=> {
        })
      }
    } catch (e) {
      alert(e)
    }

  }

  renderForm() {
    const { payType } = this.state;
    const { navigation, user, postType } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo:DOCTOR_ITEM = params.doctorInfo || {};
    const time = params.time;
    return <View>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊时间</Text>
          <Text style={styles.ipt}>
            {time}
          </Text>
        </CardItem>

        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊科室</Text>
          <Text style={styles.ipt}>
            {doctorInfo.medicalDepartment}
          </Text>
        </CardItem>

        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生姓名</Text>
          <Text style={styles.ipt}>
            {doctorInfo.name}
          </Text>
        </CardItem>
        
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊人姓名</Text>
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
          <Text style={styles.formItemLabel}>手机号</Text>
          <Text style={styles.ipt}>
          {user.mobile}
          </Text>
        </CardItem>

        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>挂号费</Text>
          <Text style={styles.ipt}>
          {doctorInfo.registrationFee}￥
          </Text>
        </CardItem>
      </Card>
      <View style={{
        height: 10,
        backgroundColor: '#F9FAFF'
      }}></View>
      <Card noShadow style={styles.formCard}>
        <CardItem button onPress={() => {
          this.setState({
            isModalVisible: true,
          })
        }} style={[styles.formItem, styles.spaceBetween]}>
          <Text style={styles.formItemTitle}>选择支付方式</Text>
          <View style={{
            marginRight: -20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
             <FastImage
              style={{
                marginRight: 3,
                width: 13.5,
                height: 13.5,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={payType === 'wx' ? icon_wx : icon_zfb}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={[styles.formItemTitle, styles.formItemMoney]}>
              {payType === 'wx' ? '微信' : '支付宝'}
            </Text>
            <View style={{ width: 10, }} />
            <Icon style={{ fontSize: 16, color: '#D0D0D0' }} name="arrow-down" />
          </View>
        </CardItem>
      
        <View style={styles.btnWrap}>
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 1, y: 1}}
              colors={['#5277F1', '#5277F1']}
              style={[
                styles.linearGradientBtn,
                {
                  opacity: this.state.remark ? 1 : 1
                }
              ]}
            >
              <Button
                full
                transparent
                rounded
                onPress={async () => {
                  // this.props.dispatch(StackActions.replace({
                  //   routeName: 'AppointmentSuccess',
                  //   params: {},
                  // }))
                  this.handlePay();

                }}
                style={styles.submitButton}
                textStyle={{
                  color: '#fff'
                }}
              >
                <Title>去付款</Title>
              </Button>
            </LinearGradient>
          </View>
      </Card>
    </View>
  }

  render() {
    const { orientationType, payType } = this.state;
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
        <Header>
            <Left>
                <Button
                  transparent
                  onPress={() => {
                    const { dispatch } = this.props;
                    dispatch(NavigationActions.back());
                  }}
                >
                  <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title style={styles.title}>{this.props.postType || '挂号'}详情</Title>
            </Body>
            <Right />
        </Header>
        <StatusBar barStyle="dark-content" />
        <Content
          disableKBDismissScroll
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          {this.renderForm()}
        </Content>
        <Modal
          coverScreen={false}
          useNativeDriver
          propagateSwipe
          isVisible={this.state.isModalVisible}
          onBackButtonPress={() => {
            this.setState({
              isModalVisible: false,
            })
          }}
          onBackdropPress={() => {
            this.setState({
              isModalVisible: false,
            })
          }}
          style={{
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
            <View style={{
              backgroundColor: '#fff'
            }}>
              <List>
                <ListItem>
                  <Left style={{
                    flex: 0,
                  }}>
                    <Button
                      transparent
                      onPress={() => {
                        this.setState({
                          isModalVisible: false,
                        })
                      }}
                    >
                      <Text>取消</Text>
                    </Button>
                  </Left>
                  <Body style={{
                    flexGrow: 1,
                  }}>
                    <Text style={{
                      textAlign: 'center'
                    }}>请选择</Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => {
                        this.setState({
                          isModalVisible: false,
                        })
                      }}
                    >
                      <Text>确定</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
              <CardItem
          onPress={() => {
            this.setState({
              payType: 'wx'
            })
          }}
          button style={[styles.formItem, styles.spaceBetween]}>
          <View style={styles.row}>
            <FastImage
              style={{
                marginRight: 16,
                width: 36,
                height: 36,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={icon_wx}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.formItemLabel}>微信</Text>
          </View>

          {
            payType === 'wx' ? (
              <Icon style={{
                color: '#5277F1'
              }} name="checkmark" />
            ) : null
          }
        </CardItem>
        <CardItem
          onPress={() => {
            this.setState({
              payType: 'ali'
            })
          }}
          button style={[styles.formItem, styles.spaceBetween]}>
          <View style={styles.row}>
            <FastImage
              style={{
                marginRight: 16,
                width: 36,
                height: 36,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={icon_zfb}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.formItemLabel}>支付宝</Text>
          </View>
          {
            payType === 'ali' ? (
              <Icon style={{
                color: '#5277F1'
              }} name="checkmark" />
            ) : null
          }
        </CardItem>
        <SafeAreaView />
            </View>
        </Modal>
      </Container>
    );
  }
}
export default Home;
