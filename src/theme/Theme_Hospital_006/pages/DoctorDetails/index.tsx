import React from 'react';
import {TouchableOpacity, ScrollView, StatusBar, Dimensions, View, ImageBackground} from 'react-native';
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
  Tabs,
  Tab,
} from 'native-base';
import _ from 'lodash';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import FastImage from 'react-native-fast-image';
import icon from './assets/icon_left_slices/icon_left.png';
import {DOCTOR_ITEM, APPOINTMENT, APPOINTMENT_RES, REGISTRATIONS_ITEM} from '../../services/api';
import moment from 'moment';
// 里面的字符可以根据自己的需要进行调整
moment.locale('zh-cn')
import utils from './utils/index';
import bg from '@/theme/Theme_Hospital_006/components/LoginModal/assets/bg/bg.png';
import {getStatusBarHeight} from "react-native-status-bar-height";

export interface IProps {}

export interface IState {
  appointment: {
    "registrationCount": number;// 总预约数
    "registrations": Array<REGISTRATIONS_ITEM>
  } | undefined,
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
  }
  state: IState = {
    appointment: undefined
  };

  cellIndex_1 = 0;
  cellIndex_2 = 0;

  async componentDidMount() {
    await this.getInfo();
  }

  async getInfo() {
    try {
      const { navigation } = this.props;
      const { params = {} } = navigation.state;
      const doctorInfo:DOCTOR_ITEM = params.doctorInfo || {};
      const res = await APPOINTMENT({ doctorId: doctorInfo.id });
      if (res.code === 0) {
        this.setState({
          appointment: res.data,
        })
        console.log('appointment', res.data)
      }
    } catch (e) {
      alert(e)
    }
  }

  renderForm(type) {
    const { appointment = {} } = this.state;
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo:DOCTOR_ITEM = params.doctorInfo || {};
    return <View>
      <Card noShadow style={styles.formCard}>
        {type === 0 ? (
          <CardItem style={styles.formItem}>
            <Text style={styles.formItemLabel}>
              {doctorInfo.personalIntro}
            </Text>
          </CardItem>
        ) : undefined}
        {type === 1 ? (
          <CardItem style={styles.formItem}>
            <Text style={styles.formItemLabel}>
              {doctorInfo.skillsIntro}
            </Text>
            <Text style={styles.ipt}>

            </Text>
          </CardItem>
        ) : undefined}
        {type === 2 ? (
          <CardItem style={styles.formItem}>
            <Text style={styles.formItemLabel}>
              {doctorInfo.personalIntro}
            </Text>
          </CardItem>
        ) : undefined}
      </Card>


      {/*<Card noShadow style={styles.formCard}>*/}
      {/*  <CardItem style={[styles.formItem, styles.spaceBetween]}>*/}
      {/*    <Text style={styles.formItemTitle}>出诊信息</Text>*/}
      {/*    <Text style={[styles.formItemTitle, styles.formItemMoney]}>挂号费：￥{doctorInfo.registrationFee}</Text>*/}
      {/*  </CardItem>*/}
      {/*  <CardItem style={styles.formItem}>*/}
      {/*    /!*{this.renderTable()}*!/*/}
      {/*  </CardItem>*/}
      {/*</Card>*/}

    </View>
  }

  renderTable() {
    const { appointment = {} } = this.state;
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo:DOCTOR_ITEM = params.doctorInfo || {};
    const { registrations = [] } = appointment;
    const tableData1 = [
      '上午',
    ];
    const tableData2 = [
      '下午',
    ];
    const widthArr = [62.5]
    const tableHead = [''];
    registrations.forEach((item: REGISTRATIONS_ITEM = {}) => {
      if (!item) {
        return;
      }
      widthArr.push(62.5)
      tableHead.push(item.date || '')
      const { data = [] } = item || {};
      let NODE_AM = '';
      let NODE_PM = '';
      if (data && _.isArray(data) && data.length) {
        let NODE = null;
        data.forEach((cItem: REGISTRATIONS_ITEM_INFO = {}) => {
          if (cItem.remainCount > 0) {
            NODE = (<TouchableOpacity onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'AppointmentDetails',
                params: {
                  doctorInfo,
                  registration_id: cItem.id,
                  segmentActive: params.segmentActive,
                  time: `${moment(item.date).format('YYYY.MM.DD')} ${cItem.timeslot === 1 ? '上午' : '下午'} `
                },
              }))
            }}>
              <View style={styles.startWrap}><Text style={styles.start}>
                {
                  cItem.timeslot === 1 ? (
                    `预约数${data[0].remainCount || 0}`
                  ) : (
                    `预约数${data[1].remainCount || 0}`
                  )
                }
               </Text></View>
            </TouchableOpacity>)
          }
          if (cItem.remainCount === 0) {
            NODE = (<Text style={styles.end}>挂满</Text>);
          }
          if (cItem.timeslot === 1) {
            NODE_AM = (NODE);
          }
          if (cItem.timeslot === 2) {
            NODE_PM = (NODE);
          }
        })
      }
      tableData1.push(NODE_AM);
      tableData2.push(NODE_PM);
    });

    return <View>
      <View style={{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: 40,
      }}>
        <Icon style={{ paddingHorizontal: 20, color: '#000', fontSize: 12 }} name='arrow-back' />
        <Text>{moment.monthsShort()[moment().month()]} {moment().format('YYYY')}</Text>
        <Icon style={{
          alignItems: 'center',
          paddingHorizontal: 20, color: '#000', fontSize: 12,
          transform: [{ rotate: '180deg' }]
        }} name='arrow-back' />
      </View>
      <ScrollView style={styles.scrollView} horizontal={true}>

      <Table>
        <TableWrapper borderStyle={{borderWidth: 0, borderColor: '#D9E9FE'}} style={[styles.tableRow]}>
          {
            tableHead.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                    {
                      cellIndex === 0 ? undefined : <>
                        <Text style={styles.tableHeaderText}>周{utils[moment(cellData).day()]}</Text>
                        {/*<Text style={styles.headerCellSpanText}>{moment(cellData).format('MM-DD')}</Text>*/}
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
        <TableWrapper borderStyle={{borderWidth: 1, borderColor: '#E8E8E8'}} style={[
          styles.tableRow, styles.tableDataWrapper
        ]}>
          {
            tableData1.map((cellData, cellIndex) => {
              if (cellIndex > 0) {
                if (this.cellIndex_1 > 3) {
                  this.cellIndex_1 = 0;
                }
                this.cellIndex_1 += 1;
              }
              return  <Cell
                key={cellIndex}
                style={{
                  height: 27*3,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                }}
                data={
                  <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                    {
                      cellData === '上午' && cellIndex === 0 ? (
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27, }]}>
                          {
                            _.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )
                          }
                        </View>
                      ) : <>
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27,
                          borderBottomColor: '#F3F3F3',
                          borderBottomWidth: 1,
                        }]}>
                          {
                            this.cellIndex_1  === 1 ? (_.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )) : null
                          }
                        </View>
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27,
                          borderBottomColor: '#F3F3F3',
                          borderBottomWidth: 1,
                        }]}>
                          {
                            this.cellIndex_1  === 2 ? (_.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )) : null
                          }
                        </View>
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27,
                          borderBottomColor: '#F3F3F3',
                          borderBottomWidth: 1,
                        }]}>
                          {
                            this.cellIndex_1  === 3 ? (_.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )) : null
                          }
                        </View>
                      </>
                    }
                  </View>
                }
                textStyle={styles.tableHeaderText}
              />
            })
          }
        </TableWrapper>
        <TableWrapper borderStyle={{borderWidth: 1, borderColor: '#E8E8E8'}} style={[styles.tableRow, styles.tableDataWrapper]}>
          {
            tableData2.map((cellData, cellIndex) => {
              if (cellIndex > 0) {
                if (this.cellIndex_2 > 3) {
                  this.cellIndex_2 = 0;
                }
                this.cellIndex_2 += 1;
              }
              return <Cell
                key={cellIndex}
                style={{
                  height: 27*3,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                }}
                data={
                  <View style={[styles.cellWrap, { width: widthArr[cellIndex] }]}>
                    {
                      cellData === '下午' && cellIndex === 0 ? (
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27, }]}>
                          {
                            _.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )
                          }
                        </View>
                      ) : <>
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27,
                          borderBottomColor: '#F3F3F3',
                          borderBottomWidth: 1,
                        }]}>
                          {
                            this.cellIndex_2  === 1 ?(_.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )) : null
                          }
                        </View>
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27,
                          borderBottomColor: '#F3F3F3',
                          borderBottomWidth: 1,
                        }]}>
                          {
                            this.cellIndex_2  === 2 ? (_.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )): null
                          }
                        </View>
                        <View style={[styles.cellWrap, { width: widthArr[cellIndex], height: 27,
                          borderBottomColor: '#F3F3F3',
                          borderBottomWidth: 1,
                        }]}>
                          {
                            this.cellIndex_2  === 3 ? (_.isString(cellData) ? <Text style={styles.tableHeaderText}>{cellData}</Text> : (
                              _.isObject(cellData) ? cellData : undefined
                            )) : null
                          }
                        </View>
                      </>
                    }
                  </View>
                }
                textStyle={styles.tableHeaderText}
              />
            })
          }
        </TableWrapper>
      </Table>
    </ScrollView>
    </View>
  }

  render() {
    const { appointment = {} } = this.state;
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo:DOCTOR_ITEM = params.doctorInfo || {};
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
          }}
          onDidFocus={payload => {
            this.componentDidMount()
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
            <View>
              <Header
                style={[styles.header, {
                  marginTop: -getStatusBarHeight(true),
                  borderBottomWidth: 0,
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
                  <Title style={styles.headerText}> {doctorInfo.medicalDepartment || '医生详情'}</Title>
                </Body>
                <Right/>
              </Header>
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
                      marginBottom: 10,
                      width: 60,
                      height: 60,
                      marginRight: 16,
                      borderRadius: 12,
                      backgroundColor: '#F4F4F4',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={{ uri: doctorInfo.avatar }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Body>
                    <View style={styles.itemHeader}>
                      <Text style={styles.nameText}>
                        {doctorInfo.name}
                      </Text>
                      <View style={{ width: 20, }}></View>
                      <Text  style={[styles.nameText]}>预约数 {appointment.registrationCount || 0} 次</Text>

                    </View>
                    <View style={{
                      marginTop: 7,
                      flexDirection: 'row',
                    }}>
                      <Text style={styles.note}>{doctorInfo.hospitalName}</Text>
                      <Text style={[styles.note, styles.span]}>
                        {doctorInfo.medicalDepartment}
                      </Text>
                      <View style={{width: 10,}}></View>
                      <Text style={styles.note}>{doctorInfo.professionalTitle}</Text>
                    </View>

                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Tabs
              style={{
                marginTop: 0,
                flexGrow: 1,
              }}
              tabBarUnderlineStyle={{
                // width: 60,
                height: 2,
                backgroundColor: '#6093FB'
              }}
            >
              <Tab style={{
                flexGrow: 1,
                backgroundColor: '#fff'
              }} heading="医生介绍">
                {this.renderForm(0)}
              </Tab>
              <Tab style={{
                flexGrow: 1,
                backgroundColor: '#fff'
              }}  heading="擅长疾病">
                {this.renderForm(1)}
              </Tab>
              <Tab style={{
                flexGrow: 1,
                backgroundColor: '#fff'
              }} heading="出诊信息">
                {this.renderTable()}
              </Tab>
            </Tabs>
          </Content>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default Home;
