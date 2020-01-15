import React from 'react';
import {Dimensions, ImageBackground, SectionList, View} from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  CardItem,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Input, Icon,
  Segment,
  Tabs,
  Tab,
  Picker,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import VideoPlayer from '@/components/react-native-aliyun-vod-controls'
import Orientation, {OrientationType} from "react-native-orientation-locker";
import home_bg_slices from './assets/home_bg_slices/pic_home_bg.png'
import user from './assets/user_slices/user.png'
import icon_myorder_default_slices from './assets/icon_myorder_default_slices/icon_myorder_default.png';
import icon_myorder_active_slices from './assets/icon_myorder_active_slices/icon_myorder_active.png';
import icon_register_default_slices from './assets/icon_register_default_slices/icon_register_default.png';
import icon_register_active_slices from './assets/icon_register_active_slices/icon_register_active.png';

import icon_live_slices_0 from './assets/icon_live_slices_0/icon_live.png';
import icon_live_slices_1 from './assets/icon_live_slices_1/icon_live.png';
import icon_live_slices_2 from './assets/icon_live_slices_2/icon_live.png';
import LinearGradient from "react-native-linear-gradient";

import { withCancelModal } from '@/components/CancelModal';
import { withGoToRoomModal } from '@/components/GoToRoomModal';
import { withSelectDepartmentModal } from '@/components/SelectDepartmentModal';
import { withSelectDoctorModal } from '@/components/SelectDoctorModal';
import { withSelectLevelModal } from '@/components/SelectLevelModal';

export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

  state = {
    active: 0,
    segmentActive: 0,
    department: undefined,
    level: undefined,
    orientationType: 'PORTRAIT',
    video: {
      videoUrl: '',
      videoWidth: undefined,
      height: undefined,
      duration: 0,
    }
  };

  componentDidMount(): void {
    // this.props.handleShowGoToRoomModal();
  }

  renderItem() {
    const type = 1;
    const icon = icon_live_slices_0;
    const iconText = styles.itemIconText00;
    return <Card bordered style={styles.itemBox}>
      <View style={[styles.typeLineDefault]}></View>
      <CardItem button onPress={() => {
        // this.props.dispatch(NavigationActions.navigate({
        //   routeName: 'AppointmentDetails',
        //   params: {},
        // }));
      }} style={styles.itemBoxBody}>
        <View style={styles.itemBoxLeft}>
          <FastImage
            style={{
              width: 40,
              height: 40,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            source={icon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text  style={[styles.itemIconText, iconText]}>
            未开始
          </Text>
        </View>
        <View style={styles.itemBoxContent}>
          <Title style={styles.itemBodyTitle}>
            上午-小儿科
          </Title>
          <Text style={[styles.itemBodyText, styles.itemBodyText001]}>
            成都市人民医院 张明 主治医师
          </Text>
          <View style={[styles.itemBoxFooter]}>
            <Text numberOfLines={2} style={[styles.itemBodyText]}>
              前面还有
              <Text style={[styles.itemBodyText, styles.itemBodyText002]}>12</Text>
              人
            </Text>
            <View style={styles.itemBodyBtnWrap}>
              <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={['#DCE3EE', '#DCE3EE']}
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
                      routeName: 'Room',
                      params: {},
                    }))
                  }}
                  style={[
                    styles.btnDefault,
                    styles.submitButton
                  ]}
                  textStyle={{
                    color: '#fff'
                  }}
                >
                  <Title style={styles.btnText}>进入诊室</Title>
                </Button>
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={['#6AE27C', '#17D397']}
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
                      routeName: 'Room',
                      params: {},
                    }))
                  }}
                  style={[
                    styles.btnDefault,
                    styles.submitButton
                  ]}
                  textStyle={{
                    color: '#fff'
                  }}
                >
                  <Title style={styles.btnText}>进入诊室</Title>
                </Button>
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={['transparent', 'transparent']}
                style={[
                  styles.linearGradientBtn,
                  styles.clearButton,
                ]}
              >
                <Button
                  full
                  transparent
                  rounded
                  onPress={async () => {
                    this.props.handleShowCancelModal();
                  }}
                  style={[
                    styles.btnDefault,
                  ]}
                  textStyle={{
                    color: '#fff'
                  }}
                >
                  <Title style={[styles.btnText, styles.btnClearText]}>取消预约</Title>
                </Button>
              </LinearGradient>
            </View>
          </View>
        </View>
      </CardItem>
    </Card>
  }

  renderTabList() {
    const { orientationType } = this.state;
    let list = [
      { title: "今日预约", data: [1,2,3] },
      { title: "全部预约", data: [1,2,3] },
    ]
    return <SectionList
      style={{
        flexGrow: 1,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      stickySectionHeadersEnabled
      onEndReachedThreshold={0.3}
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
      onEndReached={this._onMore}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index, section }) => {
        if (item === 'MSG') {
          return this.allInfo()
        }
        return <View key={JSON.stringify(item)}>
          {this.renderItem(item)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <Text style={styles.itemTitle}>{title}</Text>
      }}
      sections={list}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => {
        return <View />
      }}
      keyExtractor={(item, index) => JSON.stringify(item)}
      renderSectionFooter={() => <View><View style={{ height: 20 }} /></View>}
    />
  }

  renderTabForm() {
    const { segmentActive, department, level } = this.state;
    const { handleShowSelectDepartmentModal, handleShowSelectLevelModal } = this.props;
    return <Content contentContainerStyle={styles.formContent}>
      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem, styles.center]}>
          <Segment style={styles.segmentWrap}>
            <Button
              onPress={() => {
                this.setState({
                  segmentActive: 0,
                })
              }}
              style={styles.segmentBtn} active={segmentActive === 0} first><Text style={styles.segmentBtnText}>挂号当日</Text></Button>
            <Button
              onPress={() => {
                this.setState({
                  segmentActive: 1,
                })
              }}
              style={styles.segmentBtn} active={segmentActive === 1} last><Text style={styles.segmentBtnText}>预约挂号</Text></Button>
          </Segment>
        </CardItem>

        <CardItem
          onPress={() => {
            handleShowSelectDepartmentModal((department) => {
              this.setState({
                department,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>选择科室</Text>
          <Text style={[styles.ipt, department ? { color: '#404E66' } : {}]}>{department || '请选择科室'}</Text>
          <Right>
            <Icon style={{ fontSize: 16, color: '#404E66' }} name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem
          onPress={() => {
            handleShowSelectLevelModal((level) => {
              this.setState({
                level,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生职称</Text>
          <Text style={[styles.ipt, level ? { color: '#404E66' } : {}]}>{level || '请选择医生职称'}</Text>
          <Right>
            <Icon style={{ fontSize: 16, color: '#404E66' }} name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem style={styles.formItem}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#6AE27C', '#17D397']}
            style={[
              styles.linearGradientBtn2,
              {
                opacity: level && department ? 1 : 0.4
              }
            ]}
          >
            <Button
              full
              transparent
              rounded
              onPress={async () => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'DoctorList',
                  params: {},
                }))
              }}
              style={styles.submitButton}
              textStyle={{
                color: '#fff'
              }}
            >
              <Title>确定</Title>
            </Button>
          </LinearGradient>
        </CardItem>
      </Card>
    </Content>
  }

  render() {
    const { active } = this.state;
    return (
      <Container style={styles.container}>
        <NavigationEvents
            onWillFocus={payload => {
              const { navigation, exams } = this.props;
              const { params = {} } = navigation.state;
              if (_.isNumber(params.active)) {
                this.setState({
                  active: params.active
                })
              }
            }}
            onDidFocus={payload => {

            }}
            onWillBlur={payload => {}}
            onDidBlur={payload => {}}
        />
        <ImageBackground
          source={home_bg_slices}
          style={{
            width: '100%',
            height: 188,
          }}
        >
          <Content
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View>
              <FastImage
                style={{
                  width: 78,
                  height: 86,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={user}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <Text style={{
              color: '#404E66',
              fontSize: 16,
              lineHeight: 22.5,
              fontWeight: '400',
            }}>东毅</Text>
          </Content>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
          }}
        >
          <Tabs
            page={active}
            renderTabBar={() => <View />}
            onChangeTab={({i}) => {
              this.setState({
                active: i
              })
            }}
          >
            <Tab
              style={{
                backgroundColor: '#F9FBFF',
              }}
              heading="1">
              {this.renderTabList()}
            </Tab>
            <Tab
              style={{
                backgroundColor: '#F9FBFF',
              }}
              heading="2">
              {this.renderTabForm()}
            </Tab>
          </Tabs>
        </View>
        <Footer style={styles.footerWrap}>
          <FooterTab style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              onPress={() => {
                this.setState({
                  active: 0,
                })
              }}
              full style={styles.btnTab}>
              <FastImage
                style={{
                  width: 28,
                  height: 28,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={active === 0 ? icon_myorder_active_slices : icon_myorder_default_slices}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>我的预约</Text>
            </Button>
            <View style={styles.line} />
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              full style={styles.btnTab}>
              <FastImage
                style={{
                  width: 28,
                  height: 28,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={active === 1 ? icon_register_active_slices : icon_register_default_slices }
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>挂号预约</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withSelectLevelModal(withSelectDoctorModal(withSelectDepartmentModal(withGoToRoomModal(withCancelModal(Home)))));
