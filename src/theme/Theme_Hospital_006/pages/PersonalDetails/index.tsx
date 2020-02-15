import React from 'react';
import {Dimensions, ImageBackground, StatusBar, View} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Left,
  Label,
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
import {OrientationType} from "react-native-orientation-locker";
import LinearGradient from "react-native-linear-gradient";
import {PATIENTS_DETAILS, PATIENTS_INFO_PUT} from '../../services/api';
import { withSelectDateTimeModal } from '@/theme/Theme_Hospital_006/components/SelectTimeModal';
import { withSelectGenderModal } from '@/theme/Theme_Hospital_006/components/SelectGenderModal';
import moment from 'moment';
import _ from 'lodash';
import bg from '@/theme/Theme_Hospital_006/components/LoginModal/assets/bg/bg.png';
import {getStatusBarHeight} from "react-native-status-bar-height";
export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect(({ user }) => {
  return { user: user.info }
}) as any)
class Home extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
  }

  state = {
    orientationType: 'PORTRAIT',
    video: {
      videoUrl: '',
      videoWidth: undefined,
      height: undefined,
      duration: 0,
    }
  };

  componentDidMount(): void {
    this.getUserInfo();
  }

  async postData() {
    try {
      const { user } = this.props;
      const res = await PATIENTS_INFO_PUT({
        id: user.id,
        "name": this.state.name,// 【必须】
        "idCard":this.state.idCard,// 身份证
        "birthdate":moment(this.state.birthdate).format('X') - 0,// 生日
        "gender":this.state.gender - 0,// 性别（1-男 2-女）
        "age":this.state.age - 0,// 年龄
        "medicalHistory":this.state.medicalHistory,// 病史
      })
      if (res.code === 0) {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'Home',
          params: {},
        }))
      } else {
        throw res.msg
      }
    } catch (e) {
      alert(e)
    } finally {
      this.getUserInfo()
    }
  }

  async getUserInfo() {
    try {
      const userRes = await PATIENTS_DETAILS({});
      if (userRes.code === 0) {
        const userInfo = await this.props.dispatch({
          type: 'user/setUserAsync',
          payload: {
            user: userRes.data,
          }
        });
        const { data = {} } = userRes;
        this.setState({
          "name": data.name,// 【必须】
          "idCard":data.idCard,// 身份证
          "birthdate":data.birthdate,// 生日
          "gender":data.gender - 0,// 性别（1-男 2-女）
          "age": data.age + '',// 年龄
          "medicalHistory": data.medicalHistory,// 病史
        })
      } else {
        throw userRes.msg
      }

    } catch (e) {
      alert(e)
    }
  }

  renderForm() {
    return <View>
      <Card noShadow style={styles.formCard}>
        <View style={styles.formItem}>
          <Form>
            <Item style={styles.formItemContent}  floatingLabel>
              <Label style={styles.formItemLabel}>姓名</Label>
              <Input value={this.state.name} style={styles.ipt} placeholder="请输入姓名" placeholderTextColor={"#9C9EB9"}
                     onChangeText={(value) => {
                       this.setState({
                         name: value,
                       })
                     }}
              />
            </Item>
          </Form>
        </View>
        <View style={styles.formItem}>
          <Form>
            <Item style={styles.formItemContent}  floatingLabel>
              <Label style={styles.formItemLabel}>年龄</Label>
              <Input value={this.state.age} style={styles.ipt} placeholder="请输入年龄" placeholderTextColor={"#9C9EB9"}
                     onChangeText={(value) => {
                       this.setState({
                         age: value,
                       })
                     }}
              />
            </Item>
          </Form>
        </View>

        <View style={styles.formItem}>
          <Form>
            <Item style={styles.formItemContent}  floatingLabel>
              <Label style={styles.formItemLabel}>身份证号</Label>
              <Input value={this.state.idCard} style={styles.ipt} placeholder="请输入身份证号" placeholderTextColor={"#9C9EB9"}
                     onChangeText={(value) => {
                       this.setState({
                         idCard: value,
                       })
                     }}
              />
            </Item>
          </Form>
        </View>

        <View style={styles.formItem}>
          <Form>
            <Item style={styles.formItemContent}  floatingLabel>
              <Label style={styles.formItemLabel}>手机号</Label>
              <Input value={this.state.mobile} style={styles.ipt} placeholder="请输入手机号" placeholderTextColor={"#9C9EB9"}
                     onChangeText={(value) => {
                       this.setState({
                         mobile: value,
                       })
                     }}
              />
            </Item>
          </Form>
        </View>

        <View style={styles.formItem}>
          <Form>
            <Item style={styles.formItemContent} floatingLabel>
              <Label style={styles.formItemLabel}>病史</Label>
              <Input value={this.state.medicalHistory} style={styles.ipt} placeholder="请输入病史" placeholderTextColor={"#9C9EB9"}
                     onChangeText={(value) => {
                       this.setState({
                         medicalHistory: value,
                       })
                     }}
              />
            </Item>
          </Form>
        </View>

        <View style={styles.btnWrap}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#6093FB', '#6093FB']}
            style={[
              styles.linearGradientBtn,
              {
                opacity:
                  this.state.name &&
                  this.state.idCard &&
                  this.state.birthdate &&
                  this.state.gender &&
                  this.state.age ?
                    1 : 0.4
              }
            ]}
          >
            <Button
              full
              transparent
              rounded
              onPress={async () => {
                this.postData()
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
      </Card>
    </View>
  }

  render() {
    const { orientationType } = this.state;
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={async payload => {
            try {
              this.componentDidMount()
            } catch (e) {

            }
            await this.componentDidMount();
          }}
          onDidFocus={async payload => {

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
            alignItems: 'center',
          }}>
            <View style={{
              paddingHorizontal: 16,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#FFFFFF'
              }}>
                修改个人信息
              </Text>
            </View>
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
              {this.renderForm()}
            </Content>
            <Footer
              style={styles.footerWrap}
            >

            </Footer>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default withSelectGenderModal(withSelectDateTimeModal(Home));
