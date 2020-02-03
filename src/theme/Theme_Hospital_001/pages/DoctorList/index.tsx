import React from 'react';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
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
              <View style={{
                flex: 1,
                flexGrow: 1,
              }}>
                <FlatList
                  style={{
                    flex: 1,
                    flexGrow: 1,
                    marginLeft: -18,
                    backgroundColor: '#F4F4F4'
                  }}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  data={list.length%2 === 0 ? list : [].concat(list, 'kong')}
                  keyExtractor={(item, index) => JSON.stringify(item)}
                  ItemSeparatorComponent={() => <View style={{ width: 16, height: 16, }} />}
                  renderItem={({ item }) => {
                    const { selected } = this.state;
                    const isSelect: boolean = selected && item.id === selected.id;
                    if (item === 'kong'){
                      return <View style={{
                          flex: 1,
                          marginLeft: 18,
                          borderRadius: 4,
                          paddingHorizontal: 10,
                          paddingVertical: 18,
                        }} />
                    }
                    return <View style={{
                      flex: 1,
                      marginLeft: 18,
                      borderRadius: 4,
                      backgroundColor: '#fff',
                      paddingHorizontal: 10,
                      paddingVertical: 18,
                    }}>
                      <TouchableOpacity
                        onPress={async () => {
                          this.props.dispatch(NavigationActions.navigate({
                            routeName: 'DoctorDetails',
                            params: {
                              doctorInfo: item,
                            },
                          }))
                        }}
                        key={item.id}>
                        <View style={{
                          marginTop: 18,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <FastImage
                            style={{
                              width: 64,
                              height: 64,
                              marginBottom: 24,
                              borderRadius: 32,
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}
                            source={{ uri: item.avatar}}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </View>
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
                      </TouchableOpacity>
                    </View>
                  }}
                  horizontal={false}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
          </Container>
        );
    }
}
export default withLoginModal(Home);
