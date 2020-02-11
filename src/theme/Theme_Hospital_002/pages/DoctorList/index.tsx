import React from 'react';
import {StatusBar, Text, View} from 'react-native';
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
        const { navigation } = this.props;
        const { params = {} } = navigation.state;
        const { department } = params;
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
                      <Title style={styles.title}>{department || '医生列表'}</Title>
                  </Body>
                  <Right />
              </Header>
              <StatusBar barStyle="dark-content" />
              <Content style={{ backgroundColor: '#F9FAFF' }}
                       contentContainerStyle={{
                          //  padding: 16,
                       }}
              >
                  <Card noShadow style={styles.card}>
                      {
                          list.map((item: DOCTOR_ITEM) => {
                              const { selected } = this.state;
                              const isSelect: boolean = selected && item.id === selected.id
                              return <View key={item.id} style={{
                                backgroundColor: '#fff',
                                paddingBottom: 20,
                                marginBottom: 10,
                              }}><CardItem
                                button
                                onPress={async () => {
                                    this.props.dispatch(NavigationActions.navigate({
                                        routeName: 'DoctorDetails',
                                        params: {
                                          doctorInfo: item,
                                          segmentActive: this.state.segmentActive
                                        },
                                    }))
                                }}
                                style={{
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                }}
                              >
                                  <Left>
                                      <Body style={{
                                        marginLeft: 0,
                                      }}>
                                          <View style={styles.itemHeader}>
                                              <Text style={styles.nameText}>
                                                  {item.name}
                                              </Text>
                                              <Text style={[styles.note, styles.span]}>
                                                  {item.professionalTitle}
                                              </Text>
                                              <Text style={[styles.note, styles.span, {
                                                flexGrow: 1,
                                                textAlign: 'right'
                                              }]}>
                                                挂号费：
                                                <Text style={[styles.note, styles.span, {
                                                  color: 'red'
                                                }]}>{item.registrationFee}</Text>
                                                元
                                              </Text>
                                          </View>

                                          <Text style={[styles.note, {
                                            marginTop: 10,
                                            fontSize: 13,
                                            color: '#666666',
                                          }]}> {item.hospitalName} {item.medicalDepartment}</Text>
                                      </Body>
                                      <FastImage
                                        style={{
                                            width: 57.5,
                                            height: 57.5,
                                            marginLeft: 5,
                                            borderRadius: 0,
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                        }}
                                        source={{ uri: item.avatar}}
                                        resizeMode={FastImage.resizeMode.contain}
                                      />
                                  </Left>
                              </CardItem>
                              <Text  numberOfLines={1} style={[styles.note, styles.strong, {
                                paddingHorizontal: 20,
                                color: '#999999',
                                fontSize: 13,
                              }]}>擅长：{item.skillsIntro}</Text>
                            </View>
                          })
                      }
                  </Card>
              </Content>
          </Container>
        );
    }
}
export default withLoginModal(Home);
