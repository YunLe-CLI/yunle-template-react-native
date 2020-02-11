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
              <Content style={{ backgroundColor: '#F9FBFF' }}
                       contentContainerStyle={{
                           padding: 16,
                       }}
              >
                  <Card noShadow style={styles.card}>
                      {
                          list.map((item: DOCTOR_ITEM) => {
                              const { selected } = this.state;
                              const isSelect: boolean = selected && item.id === selected.id
                              return <CardItem
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
                                key={item.id}>
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
                                        source={{ uri: item.avatar}}
                                        resizeMode={FastImage.resizeMode.contain}
                                      />
                                      <Body>
                                          <View style={styles.itemHeader}>
                                              <Text style={styles.nameText}>
                                                  {item.name}
                                              </Text>
                                              <Text style={[styles.note, styles.span]}>
                                                  {item.professionalTitle}
                                              </Text>
                                          </View>

                                          <Text style={styles.note}> {item.hospitalName} {item.medicalDepartment}</Text>
                                          <Text  numberOfLines={2} style={[styles.note, styles.strong]}>擅长：{item.skillsIntro}</Text>
                                      </Body>
                                  </Left>
                              </CardItem>
                          })
                      }
                  </Card>
              </Content>
          </Container>
        );
    }
}
export default withLoginModal(Home);
