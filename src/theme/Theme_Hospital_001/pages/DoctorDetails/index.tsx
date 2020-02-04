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
moment.locale('zh-cn');
import SelectT from './components/SelectTimeModal'

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
      <Card noShadow style={[styles.formCard, {
        marginBottom: 10,
      }]}>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>擅长疾病: </Text>
          <Text style={styles.formItemLabel}>
            {doctorInfo.skillsIntro}
          </Text>
        </CardItem>
        <View style={{
          marginHorizontal: 20,
          height: 1,
          backgroundColor: '#DDDDDD'
        }}></View>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemTitle}>医生介绍: </Text>
          <Text style={styles.formItemLabel}>
            {doctorInfo.personalIntro}
          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem, styles.spaceBetween]}>
          <Text style={styles.formItemTitle}>挂号费</Text>
          <Text style={[styles.formItemTitle, styles.formItemMoney]}>￥{doctorInfo.registrationFee}</Text>
        </CardItem>
        <View style={{
          height: 1,
          backgroundColor: '#DDDDDD'
        }}></View>
        <CardItem button onPress={() => {
          this.setState({
            isModalVisible: true,
          })
        }} style={[styles.formItem, styles.spaceBetween]}>
          <Text style={styles.formItemTitle}>出诊日期</Text>
          <Icon style={{ fontSize: 16, color: '#404E66' }} name="arrow-forward" />
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
      let NODE_AM = '';
      let NODE_PM = '';
      if (data && _.isArray(data) && data.length) {
        data.forEach((cItem: REGISTRATIONS_ITEM_INFO) => {
          if (cItem.remainCount > 0) {
            NODE = (<TouchableOpacity onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'AppointmentDetails',
                params: {
                  doctorInfo,
                  registration_id: cItem.id,
                  time: `${moment(item.date).format('YYYY.MM.DD')} ${cItem.remainCount === 1 ? '上午' : '下午'} `
                },
              }))
            }}>
              <Text style={styles.start}>剩余{data[0].remainCount}</Text>
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
                        <Text style={styles.tableHeaderText}>周{moment(cellData).day()}</Text>
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
              <Left style={{
                flexDirection: 'column',
              }}>
                <View>
                  <FastImage
                    style={{
                      marginBottom: 22,
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      alignContent: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#FAC6C2',
                    }}
                    source={{ uri: doctorInfo.avatar }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <Body style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.nameText}>
                      {doctorInfo.name}
                    </Text>
                    <Text style={[styles.note, styles.span]}>
                      {doctorInfo.professionalTitle}
                    </Text>
                  </View>

                  <Text style={styles.note}>{doctorInfo.hospitalName}  {doctorInfo.medicalDepartment}</Text>
                  <Text  style={[styles.note, styles.strong]}>已预约：{appointment.registrationCount || 0}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          {this.renderForm()}
        </Content>
        <SelectT
          isModalVisible={this.state.isModalVisible}
          appointment={this.state.appointment}
          onClose={() => {
            this.setState({
              isModalVisible: false,
            })
          }}
          onOk={(data) => {
            this.setState({
              isModalVisible: false,
            }, () => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'AppointmentDetails',
                params: {
                  doctorInfo,
                  registration_id: data.id,
                  time: `${moment(data.date).format('YYYY.MM.DD')} ${data.remainCount === 1 ? '上午' : '下午'} `
                },
              }))
            })
          }}
        />
      </Container>
    );
  }
}
export default Home;
