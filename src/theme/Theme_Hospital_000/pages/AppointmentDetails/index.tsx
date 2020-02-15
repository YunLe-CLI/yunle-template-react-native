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
    XPay.setWxId('2016082201783549')
    //微信支付
    //这些参数都是由后台生成的
    let params = {
      partnerId:'partnerId',
      prepayId: 'prepayId',
      packageValue:'packageValue',
      nonceStr: 'nonceStr',
      timeStamp: 'timeStamp',
      sign: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMBxw3hBZ8fJWQyneVD9PepKXtmQYbdNEQE2yn6o1COtH3XX98zCEUJ+XXnLuHLt4XCMAeYYb/oytx0gQL/zM/ZEDJYILJ70I53B+cvRZ5vpvdLGNM9yrTL34Bvig3NLrWI4GssOiSNa+YdRJ3+sft9aWZ5tYgxx8oMkeoUYn6TVAgMBAAECgYBSpUit72DTYvwUPCQUjP03DgNX6fKdFsKzw8UIyhZ4z9OP91TbIYjqBny8Xqny6YgEnov+NgZ466jKIFzOUnLAk3PtTnZPClP8OywTreXPEhyx7CixDJ+XxcWQnLwjNvtuk6yEhBPz66yK6yo3WFS+yxcaCkPiffVHZPb+N8jwYQJBAPVju/G5lqfD0y5MN63oUkvAVF4Z49H8K3Mo8UD181vGBAinpCwQsp0S/XdRPeUWCev7w7kUOSLnf3/liLgV460CQQDIw/fyDTgU5iFpoCVFT4/7jR/gNYFi7O4u9Sjhx7aJsFxdgDGHxb7HFUIK6EVgOfikbHOqDcQoGy7rFGNvG6rJAkEA68Y1Ge+gwnbUHOLciLr0/5W/Ol8T13m8YbzP+QOYHPCohYxVoIU2qNdLNG6Z0tgXFmdjyhuVPmVByyhG8eEOTQJBALBULfjR02fHl6EFnrZ5YqQ1FsH9PF5+adOkTvu+RHw6AWW9qcLt0tlXumGKDySsxczj09KPtLDk7xhZF9wGGMECQH5uDlgt998WxQi4GcigoA/56Wb18x44ujHrHIWujQl9maPqrEah+GMK4y8kuDKTzWcxIKa+2uSHmIn+Z5xe1aw=',
    }
    XPay.wxPay(params,(res)=> {
      this.postData()
    })
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
          <Text style={styles.formItemTitle}>{postType || '挂号'}信息</Text>
        </CardItem>
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
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>就诊时间</Text>
          <Text style={styles.ipt}>
            {time}
          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>就诊人信息</Text>
        </CardItem>
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
          <Text style={[styles.formItemLabel, {
            alignSelf: 'flex-start'
          }]}>看诊疾病</Text>
          <View style={{ flex: 1, flexGrow: 1, backgroundColor: '#F9FBFF', borderRadius: 2, }}>
            <Textarea rowSpan={5}
                      value={this.state.remark}
                      placeholderTextColor={'#B0BED4'} placeholder="请描述下就诊人的疾病/症状"
                      onChangeText={(remark) => {
                        this.setState({
                          remark
                        })
                      }}
            />
          </View>
        </CardItem>
      </Card>

      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem, styles.spaceBetween]}>
          <Text style={styles.formItemTitle}>支付信息</Text>
          <Text style={[styles.formItemTitle, styles.formItemMoney]}>{this.props.postType || '挂号'}费：￥{doctorInfo.registrationFee}</Text>
        </CardItem>
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
            <Text style={styles.formItemLabel}>微信支付</Text>
          </View>

          <FastImage
            style={{
              marginLeft: 16,
              width: 16,
              height: 16,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            source={payType === 'wx' ? icon_check_active : icon_check_default}
            resizeMode={FastImage.resizeMode.contain}
          />
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
            <Text style={styles.formItemLabel}>支付宝支付</Text>
          </View>
          <FastImage
            style={{
              marginLeft: 16,
              width: 16,
              height: 16,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            source={payType === 'ali' ? icon_check_active : icon_check_default}
            resizeMode={FastImage.resizeMode.contain}
          />
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
            <Title style={styles.headerText}>{this.props.postType || '挂号'}详情</Title>
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
                  opacity: this.state.remark ? 1 : 0.4
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
                  if (this.state.remark) {
                    this.handlePay();
                  } else {
                    alert('请描述下就诊人的疾病/症状')
                  }

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
        </Footer>
      </Container>
    );
  }
}
export default Home;
