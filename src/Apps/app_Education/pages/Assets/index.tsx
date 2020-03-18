import React from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';

import open from '../../components/OpenFileViewer';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import LinearGradient from "react-native-linear-gradient";

export interface IProps {}

export interface IState {
}

type fileType = {
    title: string;
    url: string;
    _id: string
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    state = {
        list: []
    };

    componentDidMount(): void {
        const { navigation } = this.props;
        const { coursewares = [] } = navigation.state.params;
        this.setState({
            list: coursewares
        })
    }
    renderItem = (data: Courses) => {
        const { coursewares = {}, status, signin } = data;
        const { navigation } = this.props;
        const { courses = {} } = navigation.state.params;
        const {  teacher = {}, } = courses;
        const type = status; // (-1-取消 1-进行 2-未开始 3-结束)
        const check = signin ? 1 : 0;
        let bg = undefined;
        return (
          <View key={JSON.stringify(data)} style={styles.itemBox}>
              <View style={{
                  flexDirection: 'row',
              }}>
                  <View style={{
                      flexGrow: 1,
                  }}>
                      <View style={{

                      }}>
                          <FastImage
                            style={{
                                width: '100%',
                                height: 81,
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}
                            source={require('./assets/item_bg_slices/index.png')}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                      </View>
                  </View>
              </View>
              <View>
                  <View style={styles.itemBox_2}>

                      <View style={{
                          flex: 1, flexGrow: 1,
                          flexDirection: 'row',
                      }}>
                          <View style={{ flex: 1, flexGrow: 1, }}>
                              <Text numberOfLines={1} style={styles.titleText}>
                                  {data.title}
                              </Text>
                          </View>
                      </View>
                  </View>
                  <View style={styles.itemBox_3}>
                      <View style={{ flex: 1, flexGrow: 1,
                          flexDirection: 'row', alignItems: 'center',
                          paddingHorizontal: 16,
                      }}>
                          <Text numberOfLines={1} style={styles.timeText}>
                              <Text numberOfLines={1} style={styles.timeText}>{moment(data.startTime).format('YYYY-MM-DD')} </Text>
                              {moment(courses.startTime).format('HH:mm')}
                              -
                              {moment(courses.endTime).format('HH:mm')}
                          </Text>
                      </View>
                  </View>
                  <View style={[styles.itemBox_3, {
                      flexDirection: 'row',
                      marginTop: 8,
                      paddingHorizontal: 16,
                      alignItems: 'center',
                  }]}>
                      <Text style={styles.nameText}>{teacher.userName}</Text>
                  </View>
              </View>
              <View style={styles.itemBox_4}>
                  <View style={styles.btnWrap}>
                      <Button
                        transparent
                        style={[styles.btnContent, {
                            borderColor: '#F6F9FB',
                            backgroundColor: '#F6F9FB'
                        }]}
                        onPress={async () => {
                            await open(data.url, data.title)
                        }}
                      >
                          <Text style={[styles.btnText, { color: '#51549A' }]}>下载</Text>
                      </Button>
                  </View>
              </View>
          </View>
        )
    }

    renderTabList() {
        let list = this.state.list;
        const { courses } = this.props;
        return <FlatList
          horizontal={false}
          style={{
              flex: 1,
              overflow: 'hidden',
              flexGrow: 1,
              marginLeft: -9,
          }}
          contentContainerStyle={{
              paddingTop: 16,
              //
              paddingHorizontal: 16,
          }}
          columnWrapperStyle={{

          }}
          numColumns={2}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index, section }) => {
              return <View style={{
                  marginLeft: 9,
                  width: (Dimensions.get('window').width - 32 - 9) /2,
                  overflow: 'hidden'
              }} key={JSON.stringify(item)}>
                  {this.renderItem(item)}
              </View>
          }}
          data={list || []}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={() => {
              return <View />
          }}
          keyExtractor={(item, index) => JSON.stringify(item)}
          renderSectionFooter={() => <View><View style={{ height: 20 }} /></View>}
        />
    }

    render() {
        const { navigation } = this.props;
        const { playbackURL = '', title = '' } = navigation.state.params;
        return (
            <Container style={styles.container}>
                <Header transparent
                        iosBarStyle={"dark-content"}
                >
                    <Left>
                        <Button transparent
                                style={{
                                    marginLeft: 10,
                                }}
                                onPress={() => {
                                    const { dispatch } = this.props;
                                    dispatch(NavigationActions.back());
                                }}
                        >
                            <Icon style={{ color: '#333333', fontSize: 25, }} color={'#333333'} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{
                            color: '#333333'
                        }}>{title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ backgroundColor: '#F6F7F7' }}>
                    <View style={{
                        flex: 1,
                        flexGrow: 1,
                    }}>
                        {this.renderTabList()}
                    </View>
                </Content>
            </Container>
        );
    }
}
export default Home;
