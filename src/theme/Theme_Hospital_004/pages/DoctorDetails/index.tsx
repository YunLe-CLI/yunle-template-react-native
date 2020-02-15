import React from 'react';
import { TouchableOpacity, ScrollView, StatusBar, Dimensions, View, ImageBackground, Alert} from 'react-native';
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
    segmentActive: 0,
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
      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem, {
          justifyContent: 'center'
        }]}>
          <View style={{
            marginRight: 10,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#000',
          }} />
          <Text style={styles.formItemTitle}>医生介绍</Text>
          <View style={{
            marginLeft: 10,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#000',
          }} />
        </CardItem>
        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            {doctorInfo.personalIntro}
          </Text>
          <Text style={styles.ipt}>

          </Text>
        </CardItem>
    
        <CardItem style={[styles.formItem, {
          justifyContent: 'center'
        }]}>
          <View style={{
            marginRight: 10,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#000',
          }} />
          <Text style={styles.formItemTitle}>擅长疾病</Text>
          <View style={{
            marginLeft: 10,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#000',
          }} />
        </CardItem>

        <CardItem style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            {doctorInfo.skillsIntro}
          </Text>
          <Text style={styles.ipt}>

          </Text>
        </CardItem>
      </Card>


      <Card noShadow style={styles.formCard}>
      <CardItem style={[styles.formItem, {
          justifyContent: 'center'
        }]}>
          <View style={{
            marginRight: 10,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#000',
          }} />
          <Text style={styles.formItemTitle}>出诊信息</Text>
          <View style={{
            marginLeft: 10,
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: '#000',
          }} />
          <Text style={[{
            position: 'absolute',
            right: 20,
            alignItems: 'flex-end'
          }, styles.formItemTitle, styles.formItemMoney]}>挂号费：￥{doctorInfo.registrationFee}</Text>
        </CardItem>
        <CardItem style={[styles.formItem, {
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          <Button
            transparent
              onPress={() => {
                this.setState({
                  segmentActive: 0,
                })
              }}
              style={[styles.segmentBtn, this.state.segmentActive === 0 ? {
                borderBottomColor: '#000000'
              } : {}]} active={this.state.segmentActive === 0} first><Text style={styles.segmentBtnText}>上午</Text></Button>
              <View style={{ width: 111, }} />
          <Button
            transparent
            onPress={() => {
              this.setState({
                segmentActive: 1,
              })
            }}
            style={[styles.segmentBtn, this.state.segmentActive === 1 ? {
              borderBottomColor: '#000000'
            } : {}]} active={this.state.segmentActive === 1} last><Text style={styles.segmentBtnText}>下午</Text></Button>
        </CardItem>
        <CardItem style={[styles.formItem, {
          paddingLeft: 0,
          paddingRight: 0,
        }]}>
          {this.renderTable()}
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
    ];
    const tableData2 = [
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
    let list = [];
    if (this.state.segmentActive === 0) {
      list = [...tableData1];
    }
    if (this.state.segmentActive === 1) {
      list = [...tableData2];
    }
    return <View style={styles.scrollView}>
      {
        tableData1.map((item = {}) => {
          return <CardItem
            key={JSON.stringify(item)}
            style={{
              backgroundColor:'transparent',
              borderBottomColor: '#eee',
              height: 52,
              borderBottomWidth: 1,
            }}
          >
            <Left>
              <Text>
                {moment(item.date).format('MM-DD')}
                <View style={{ width: 10 }} />
                周{utils[moment(item.date).day()+1]}
              </Text>
            </Left> 
            <Right>
              {
                item.remainCount === 0 ?<Text style={{ color: '#999999' }}>挂满</Text>: null
              }
              {
                item.remainCount > 0 ?<TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#000000',
                  paddingHorizontal: 9,
                  paddingVertical: 3,
                }}
                 onPress={() => {
                    this.props.dispatch(NavigationActions.navigate({
                      routeName: 'AppointmentDetails',
                      params: {
                        doctorInfo,
                        registration_id: item.id,
                        segmentActive: params.segmentActive,
                        time: `${moment(item.date).format('YYYY.MM.DD')} ${item.timeslot === 1 ? '上午' : '下午'} `
                      },
                    }))
                  }}>
                    <Text style={styles.start}>剩余{item.remainCount || 0}</Text>
                  </TouchableOpacity> : null
              }
              
            </Right>      
          </CardItem>
        })
      }
      
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
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <ImageBackground 
            source={require('./assets/bg/index.png')}
            style={{
              width: 353,
              height: 172.5,
            }}
          >
            <Card noShadow style={styles.formCard}>
              <CardItem
                button
                style={{
                  backgroundColor:'transparent'
                }}
                onPress={async () => {
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'DoctorDetails',
                    params: {},
                  }))
                }}
                >
                <Body style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                    <FastImage
                      style={{
                        marginTop: 27,
                        width: 50,
                        height: 50,
                        borderRadius: 24,
                        alignContent: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor:'#11CD8F'
                      }}
                      source={{ uri: doctorInfo.avatar }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={styles.itemHeader}>
                      <Text style={styles.nameText}>
                        {doctorInfo.name}
                      </Text>
                      <Text style={[styles.note, styles.span]}>
                        {doctorInfo.professionalTitle}
                      </Text>
                    </View>
                      
                    <Text style={styles.note}>{doctorInfo.hospitalName}  {doctorInfo.medicalDepartment}</Text>
                    <View style={{
                      position: 'absolute',
                      top: 26,
                      left: -14,
                      height: 31,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 83,
                      backgroundColor: '#eee',
                      borderTopRightRadius: 15,
                      borderBottomRightRadius: 15,
                    }}>
                      <Text  style={[{
                        
                      }, styles.note, styles.strong]}>已预约 {appointment.registrationCount || 0}</Text>
                    </View>
                  </Body>
              </CardItem>
            </Card>
          </ImageBackground>
          </View>
          
          {this.renderForm()}
        </Content>
      </Container>
    );
  }
}
export default Home;
