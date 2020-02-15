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
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import FastImage from 'react-native-fast-image';
import icon from './assets/icon_left_slices/icon_left.png';
import {DOCTOR_ITEM, APPOINTMENT, APPOINTMENT_RES, REGISTRATIONS_ITEM} from '../../services/api';
import moment from 'moment';
// 里面的字符可以根据自己的需要进行调整
moment.locale('zh-cn')
import utils from './utils/index';

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

  renderForm() {
    const { appointment = {} } = this.state;
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const doctorInfo:DOCTOR_ITEM = params.doctorInfo || {};
    return <View>
     <Card noShadow style={[styles.formCard,{
            paddingVertical: 20,
          }]}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}><View style={{
              width: 3.5,
              height: 12,
              backgroundColor: '#5277F1',
            }}/>
            <View style={{
              width: 10,
            }}/>医生介绍</Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            {doctorInfo.personalIntro}
          </Text>
          <Text style={styles.ipt}>

          </Text>
        </CardItem>
        
      </Card>
      <Card noShadow style={[styles.formCard,{
            paddingVertical: 20,
          }]}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>
            <View style={{
              width: 3.5,
              height: 12,
              backgroundColor: '#5277F1',
            }}/>
            <View style={{
              width: 10,
            }}/>
            擅长疾病
          </Text>
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            {doctorInfo.skillsIntro}
          </Text>
          <Text style={styles.ipt}>

          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={[styles.formCard,{
            paddingVertical: 20,
          }]}>
        <CardItem style={[styles.formItem, styles.spaceBetween]}>
          <Text style={styles.formItemTitle}>
          <View style={{
              width: 3.5,
              height: 12,
              backgroundColor: '#5277F1',
            }}/>
            <View style={{
              width: 10,
            }}/>
            出诊信息</Text>
          <Text style={[styles.formItemTitle]}>
            挂号费：￥
            <Text style={[styles.formItemTitle, styles.formItemMoney]}>
              {doctorInfo.registrationFee}
            </Text>
            元
          </Text>
        </CardItem>
        <CardItem style={[styles.formItem, {
          flex: 1,
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }]}>
          <View style={{
            flexGrow: 1,
          }}>
            {this.renderTable()}
          </View>
        </CardItem>
      </Card>

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
    registrations.forEach((item: REGISTRATIONS_ITEM) => {
      widthArr.push(62.5)
      tableHead.push(item.date || '')
      const { data = [] } = item;
      let NODE_AM = {date: item.date};
      let NODE_PM = {date: item.date};

      console.log(1111, data, 111);

      (data || [{}, {}]).forEach((cItem: REGISTRATIONS_ITEM_INFO) => {
       
        if (cItem.timeslot === 1) {
          NODE_AM = ({...cItem, date: item.date, remainCount: cItem.remainCount });
        }
        if (cItem.timeslot === 2) {
          NODE_PM = ({...cItem, date: item.date, remainCount: cItem.remainCount });
        }
      })
      if (NODE_AM) {
        tableData1.push(NODE_AM);
      }
      if (NODE_PM) {
        tableData2.push(NODE_PM);
      }
    });
    return <View style={{
      backgroundColor: '#F9FAFF'
    }}>
      <View style={{
      }}>
        <View style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'row',
          borderBottomColor: '#E6E6E6',
          borderBottomWidth: 1,
        }}>
          <View style={{  
            flex: 1,
            paddingVertical: 12,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text>
            </Text>
          </View>
          <View style={{
             backgroundColor: '#E6E6E6',
            width: 1,
          }} />
          <View style={{ 
            flex: 1,
            paddingVertical: 12, 
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 13,
              color: '#333333'
            }}>
              上午
            </Text>
          </View>
          <View style={{
             backgroundColor: '#E6E6E6',
            width: 1,
          }} />
          <View style={{ 
            flex: 1,
            paddingVertical: 12, 
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 13,
              color: '#333333'
            }}>
              下午
            </Text>
          </View>
        </View>
        {
          registrations.map((item, index) => {
            return <View style={{
              flex: 1,
              flexGrow: 1,
              flexDirection: 'row',
              borderBottomColor: '#E6E6E6',
              borderBottomWidth: 1,
            }}>
              <View style={{  
                flex: 1,
                paddingVertical: 12,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
                <Text style={{
                  flexWrap: 'wrap',
                  fontSize: 13,
                  color: '#333333'
                }}>
                  周{utils[moment(item.date).day()]}
                  <View style={{ width: 10, }}></View>
                  {/* {moment(item.date).format('MM-DD')} */}
                </Text>
              </View>
              <View style={{
                 backgroundColor: '#E6E6E6',
                width: 1,
              }} />
              <View style={{ 
                flex: 1,
                paddingVertical: 12, 
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                
                {(tableData1[index] || {}).remainCount === 0 ? <Text style={{
                  fontSize: 13,
                  color: '#333333'
                }}>
                  挂满
                </Text> : null}
                {(tableData1[index] || {}).remainCount > 0 ? <TouchableOpacity onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'AppointmentDetails',
                params: {
                  doctorInfo,
                  registration_id: tableData1[index].id,
                  segmentActive: params.segmentActive,
                  time: `${moment(item.date).format('YYYY.MM.DD')} ${tableData1[index].timeslot === 1 ? '上午' : '下午'} `
                },
              }))
            }}>
              <View style={styles.startWrap}><Text style={{
                  fontSize: 13,
                  color: '#5277F1'
                }}>剩余{tableData2[index].remainCount || 0}</Text></View>
            </TouchableOpacity>: null}
              </View>
              <View style={{
                 backgroundColor: '#E6E6E6',
                width: 1,
              }} />
              <View style={{ 
                flex: 1,
                paddingVertical: 12, 
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {(tableData2[index] || {}).remainCount === 0 ? <Text style={{
                  fontSize: 13,
                  color: '#fff'
                }}>
                  挂满
                </Text> : null}
                {(tableData2[index] || {}).remainCount > 0 ? <TouchableOpacity onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'AppointmentDetails',
                params: {
                  doctorInfo,
                  registration_id: tableData2[index].id,
                  segmentActive: params.segmentActive,
                  time: `${moment(item.date).format('YYYY.MM.DD')} ${tableData2[index].timeslot === 1 ? '上午' : '下午'} `
                },
              }))
            }}>
               <View style={styles.startWrap}><Text style={{
                  fontSize: 13,
                  color: '#5277F1'
                }}>剩余{tableData2[index].remainCount}</Text></View>
            </TouchableOpacity>: null}
              </View>
            </View>
          })
        }
      </View>
    </View>
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
                        <Text style={styles.tableHeaderText}>周{utils[moment(cellData).day()+1]}</Text>
                        <Text style={styles.headerCellSpanText}>{moment(cellData).format('MM-DD')}</Text>
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
                <Title style={styles.headerText}>查看医生祥情</Title>
            </Body>
            <Right />
        </Header>
        <StatusBar barStyle="dark-content" />
        <Content
          disableKBDismissScroll
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          <Card noShadow style={[styles.formCard,{
            paddingVertical: 20,
          }]}>
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
                <Body style={{
                  marginLeft: 0,
                }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.nameText}>
                      {doctorInfo.name}
                    </Text>
                    <View style={{ width: 30, }}></View>
                    <Text style={[styles.note, styles.span]}>
                      {doctorInfo.professionalTitle}
                    </Text>
                  </View>

                  <View style={{
                    marginTop: 19,
                    flexDirection: 'row',
                  }}>
                    <Text style={[styles.note, {
                      flexGrow: 1,
                      fontSize: 13,
                      color: '#666666'
                    }]}>
                    {doctorInfo.hospitalName}
                    </Text>
                    <Text style={[styles.note, {
                      flexGrow: 1,
                      fontSize: 13,
                      textAlign:'center',
                      color: '#666666'
                    }]}>
                    {doctorInfo.medicalDepartment}
                    </Text>
                    <Text  style={[styles.note, {
                      flexGrow: 1,
                      fontSize: 13,
                      textAlign:'right',
                      color: '#666666'
                    }]}>
                      已预约：{appointment.registrationCount || 0}
                    </Text>

                  </View>
                </Body>
                <FastImage
                  style={{
                    width: 57.5,
                    height: 57.5,
                    marginLeft: 25,
                    borderRadius: 0,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={{ uri: doctorInfo.avatar }}
                  resizeMode={FastImage.resizeMode.contain}
                />
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
