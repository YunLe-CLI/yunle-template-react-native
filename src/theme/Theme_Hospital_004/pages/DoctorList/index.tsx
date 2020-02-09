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
              <Header transparent>
                  <Left>
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
                            source={iconLeft}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                      </Button>
                  </Left>
                  <Body>
                      <Title style={styles.title}>医生列表</Title>
                  </Body>
                  <Right />
              </Header>
              <StatusBar barStyle="dark-content" />
              <Content style={{ backgroundColor: '#F9FBFF' }}
                       contentContainerStyle={{
                          //  padding: 16,
                       }}
              >
                  <Card noShadow style={styles.card}>
                      {
                          list.map((item: DOCTOR_ITEM) => {
                              const { selected } = this.state;
                              const isSelect: boolean = selected && item.id === selected.id
                              return <CardItem
                              style={{
                                marginLeft: -1,
                                width: '50%',
                                height: 200,
                                borderLeftColor: '#eee',
                                borderLeftWidth: 1,
                                borderBottomColor: '#eee',
                                borderBottomWidth: 1,
                              }}
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
                                  <Body style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                          <FastImage
                                            style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 24,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                            }}
                                            source={{ uri: item.avatar}}
                                            resizeMode={FastImage.resizeMode.contain}
                                          />
                                          <View style={styles.itemHeader}>
                                              <Text numberOfLines={2} style={styles.nameText}>
                                                  {item.name}
                                              </Text>
                                          </View>
                                          <Text numberOfLines={2} style={[styles.note, styles.span]}>
                                              {item.professionalTitle}
                                          </Text>
                                          <Text style={styles.note}> {item.hospitalName} {item.medicalDepartment}</Text>
                                          <Text  numberOfLines={2} style={[styles.note, styles.strong]}>擅长：{item.skillsIntro}</Text>
                                      </Body>
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
