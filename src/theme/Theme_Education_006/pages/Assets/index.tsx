import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';

import open from '@/theme/Theme_Education_001/components/OpenFileViewer';
import LinearGradient from "react-native-linear-gradient";
import FastImage from 'react-native-fast-image';

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

    renderItem(item, index, num) {
        let style = styles.itemBox_1;
        if ((index+1)%2 !== 0) {
            style = styles.itemBox_1;
        }
        if ((index+1)%2 === 0) {
            style = styles.itemBox_2;
        }
        // if (num - 2 >= index) {
        //     style = styles.itemBox_3;
        // }
        const width = Dimensions.get('window').width/2
        return <View key={JSON.stringify(item)} style={[
            styles.itemBox,
            {
                marginLeft: 16,
                marginTop: 16,
                width: width  - 16*2,
                height: width  - 32,
                // borderWidth: 1,
                // borderColor: '#EBEBEB',
            }
        ]}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#45A4FF', '#7BD1FF']}
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>
                WORD
              </Text>
            </View>
          </LinearGradient>
            <Text style={styles.itemText}>{item.title}</Text>
            <View style={[styles.btnWrap]}>
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#45A4FF', '#7BD1FF']}
                  style={[
                      styles.linearGradientBtn,
                  ]}
                >
                    <Button
                      style={[styles.btnContent, { borderWidth: 0, }]}
                      rounded transparent
                      onPress={async () => {
                          await open(item.url, item.title)
                      }}
                    >
                        <Text style={[styles.btnText, { color: '#fff' }]}>查看</Text>
                    </Button>
                </LinearGradient>
            </View>
        </View>
    }

    render() {
        const { navigation } = this.props;
        const { playbackURL = '', title = '' } = navigation.state.params;
        return (
          <Container style={styles.container}>
              <Header transparent
                      iosBarStyle={"dark-content"}
                      style={{
                        backgroundColor: '#fff',
                      }}
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
              <Content>
                  <View style={{
                      flexDirection: 'row',
                    justifyContent: 'center',
                      flexWrap: 'wrap',
                      marginLeft: -16,
                  }}>
                      {
                          ([1,2,3,4] || this.state.list).map((item: fileType, index) => {
                              return this.renderItem(item, index, this.state.list.length)
                          })
                      }
                  </View>
              </Content>
          </Container>
        );
    }
}
export default Home;
