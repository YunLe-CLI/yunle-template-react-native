import React from 'react';
import { TouchableOpacity, ScrollView, StatusBar, Dimensions, View} from 'react-native';
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
import _ from 'lodash';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import VideoPlayer from '@/components/react-native-aliyun-vod-controls'
import Orientation, {OrientationType} from "react-native-orientation-locker";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import FastImage from 'react-native-fast-image';
import icon from './assets/icon_left_slices/icon_left.png';
import icon_wx from './assets/icon_wx_slices/icon_wx.png';
import icon_zfb from './assets/icon_zfb_slices/icon_zfb.png';
import icon_check_active from './assets/icon_check_active_slices/icon_check_active.png';
import icon_check_default from './assets/icon_check_default_slices/icon_check_default.png';
import pic_sce from './assets/pic_sce_slices/pic_sce.png';
import logoImg from '@/components/LoginModal/assets/logo_slices/pic_logo_s.png';

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
    },
    payType: 'wx',
  };

  renderForm() {
    const { payType } = this.state;
    return <View>
      <Card noShadow style={styles.formCard}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>医生介绍</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            且队以装进别五了儿油任天深三建王立话不持须重飞可可育按眼族支加照格清系自和门水来流众者信山系。程易同阶市其接流心当矿八许气身完同表问属…
          </Text>
          <Text style={styles.ipt}>

          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>擅长疾病</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            心脑血管病、糖尿病、中风后遗症、高血压、冠心病、痴呆、骨质疏松、抑郁症
          </Text>
          <Text style={styles.ipt}>

          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem, styles.spaceBetween]}>
          <Text style={styles.formItemTitle}>出诊信息</Text>
          <Text style={[styles.formItemTitle, styles.formItemMoney]}>挂号费：￥20</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          {this.renderTable()}
        </CardItem>
      </Card>

    </View>
  }

  renderTable() {
    const tableData1 = [
      '上午',
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
      <TouchableOpacity onPress={() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'AppointmentDetails',
          params: {},
        }))
      }}>
        <Text style={styles.start}>剩余1</Text>
      </TouchableOpacity>,
    ];
    const tableData2 = [
      '下午',
      <Text style={styles.end}>挂满</Text>,
      <Text style={styles.end}>挂满</Text>,
      <Text style={styles.end}>挂满</Text>,
      <Text style={styles.end}>挂满</Text>,
      <Text style={styles.end}>挂满</Text>,
      <Text style={styles.end}>挂满</Text>,
      <Text style={styles.end}>挂满</Text>
    ];
    const widthArr = [62.5, 62.5, 62.5, 62.5, 62.5, 62.5, 62.5, 62.5];
    const tableHead = ['', '周六', '周日', '周一', '周二', '周三', '周四', '周五'];
    return <ScrollView style={styles.scrollView} horizontal={true}>
      <Table>
        <TableWrapper borderStyle={{borderWidth: 1, borderColor: '#E8E8E8'}} style={[styles.tableRow]}>
          {
            tableHead.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                    {
                      cellIndex === 0 ? undefined : <>
                        <Text style={styles.tableHeaderText}>{cellData}</Text>
                        <Text style={styles.headerCellSpanText}>01-30</Text>
                      </>
                    }
                  </View>
                }
                style={styles.tableHeader}
                textStyle={styles.tableHeaderText}
              />
            ))
          }
        </TableWrapper>
        <TableWrapper borderStyle={{borderWidth: 1, borderColor: '#E8E8E8'}} style={[styles.tableRow, styles.tableDataWrapper]}>
          {
            tableData1.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                    <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                      {
                        _.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : undefined
                      }
                      {
                        _.isObject(cellData) ? cellData : undefined
                      }
                    </View>
                  </View>
                }
                textStyle={styles.tableHeaderText}
              />
            ))
          }
        </TableWrapper>
        <TableWrapper borderStyle={{borderWidth: 1, borderColor: '#E8E8E8'}} style={[styles.tableRow, styles.tableDataWrapper]}>
          {
            tableData2.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                    <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                      {
                        _.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : undefined
                      }
                      {
                        _.isObject(cellData) ? cellData : undefined
                      }
                    </View>
                  </View>
                }
                textStyle={styles.tableHeaderText}
              />
            ))
          }
        </TableWrapper>
      </Table>
    </ScrollView>
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
            <Title style={styles.headerText}>医生信息</Title>
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
            <CardItem
              button
              onPress={async () => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'DoctorDetails',
                  params: {},
                }))
              }}
              >
              <Left>
                <FastImage
                  style={{
                    width: 48,
                    height: 48,
                    marginRight: 16,
                    borderRadius: 24,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={logoImg}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Body>
                  <View style={styles.itemHeader}>
                    <Text style={styles.nameText}>
                      王医生
                    </Text>
                    <Text style={[styles.note, styles.span]}>
                      主任医师
                    </Text>
                  </View>

                  <Text style={styles.note}>河南开封中心医院 皮肤科</Text>
                  <Text  style={[styles.note, styles.strong]}>已预约：666</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          {this.renderForm()}
        </Content>
      </Container>
    );
  }
}
export default Home;
