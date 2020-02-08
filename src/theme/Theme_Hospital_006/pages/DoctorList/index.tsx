import React from 'react';
import {ImageBackground, StatusBar, Text, View} from 'react-native';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Icon,
    Button,
    List,
    ListItem,
    Content,
    Card,
    CardItem,
} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { withLoginModal } from '../../components/LoginModal'
import FastImage from 'react-native-fast-image';
import iconLeft from '../../components/SelectDoctorModal/assets/icon_left_slices/icon_left.png';

import {DOCTOR_ITEM, DOCTORS_LIST} from '../../services/api';
import _ from 'lodash';
import bg from '@/theme/Theme_Hospital_006/components/LoginModal/assets/bg/bg.png';
import {getStatusBarHeight} from "react-native-status-bar-height";
import icon from '@/theme/Theme_Hospital_006/pages/AppointmentDetails/assets/icon_left_slices/icon_left.png';

export interface IProps {}

export interface IState {
  list: Array<DOCTOR_ITEM>;
  selected: undefined | DOCTOR_ITEM;
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
  }
    state = {
        list: [],
      selected: undefined,
    };

    async componentDidMount(): void {
      await this.getList();
    }

    async getList() {
      try {
        const res = await DOCTORS_LIST({});
        console.log('DOCTORS_LIST: ', res)
        if (res.code === 0) {
          const { data }  = res;
          this.setState({
            list: data
          })
        }

      } catch (e) {

      }

    }

  render() {
        const { list } = this.state;
        return (
          <Container style={styles.container}>
            <NavigationEvents
              onWillFocus={payload => {}}
              onDidFocus={async payload => {
                await this.componentDidMount();
              }}
              onWillBlur={payload => {}}
              onDidBlur={payload => {}}
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
                      <Title style={styles.headerText}>医生列表</Title>
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
              <Content style={{ backgroundColor: '#F9FBFF' }}
                       contentContainerStyle={{
                           // padding: 16,
                       }}
              >
                  <Card noShadow style={styles.card}>
                      {
                          list.map((item: DOCTOR_ITEM) => {
                              const { selected } = this.state;
                              const isSelect: boolean = selected && item.id === selected.id
                            console.log(item)
                              return <CardItem
                                button
                                style={{
                                 borderBottomWidth: 1,
                                  borderBottomColor: '#F4F4F4'
                                }}
                                onPress={async () => {
                                    this.props.dispatch(NavigationActions.navigate({
                                        routeName: 'DoctorDetails',
                                        params: {
                                          doctorInfo: item,
                                          segmentActive: this.state.segmentActive
                                        },
                                    }))
                                }}
                                key={item.id}>
                                  <Left style={{
                                    paddingVertical: 16
                                  }}>
                                      <FastImage
                                        style={{
                                            width: 60,
                                            height: 60,
                                            marginRight: 16,
                                            borderRadius: 6,
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                          backgroundColor: '#F4F4F4'
                                        }}
                                        source={{ uri: item.avatar}}
                                        resizeMode={FastImage.resizeMode.contain}
                                      />
                                      <Body>
                                          <View style={styles.itemHeader}>
                                              <Text style={styles.nameText}>
                                                  {item.name}   累计 {item.cs || 0} 次
                                              </Text>
                                            <Text style={styles.nameText}>
                                              挂号费{item.registrationFee}元
                                            </Text>
                                          </View>

                                          <Text style={styles.note}> {item.hospitalName} {item.medicalDepartment} {item.professionalTitle}</Text>
                                          <Text  numberOfLines={2} style={[styles.note]}>擅长疾病：{item.skillsIntro}</Text>
                                      </Body>
                                  </Left>
                              </CardItem>
                          })
                      }
                  </Card>
              </Content>
              </View>
            </ImageBackground>
          </Container>
        );
    }
}
export default withLoginModal(Home);
