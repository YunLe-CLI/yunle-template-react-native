import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import { NavigationActions } from 'react-navigation';
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
import { withCheckAppUpdate } from '@/components/CheckAppUpdate'
import { withLoginModal } from '@/components/LoginModal'
import FastImage from 'react-native-fast-image';
import iconLeft from '@/components/SelectDoctorModal/assets/icon_left_slices/icon_left.png';
import logoImg from '@/components/LoginModal/assets/logo_slices/pic_logo_s.png';

export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    state = {
        list: []
    };

    render() {
        const list = [
            '王医生',
            '李医生',
        ]
        return (
          <Container style={styles.container}>
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
                           padding: 16,
                       }}
              >
                  <Card noShadow style={styles.card}>
                      {
                          list.map((item) => {
                              const { selected } = this.state;
                              const isSelect = JSON.stringify(item) === JSON.stringify(selected)
                              return <CardItem
                                button
                                onPress={async () => {
                                    this.props.dispatch(NavigationActions.navigate({
                                        routeName: 'DoctorDetails',
                                        params: {},
                                    }))
                                }}
                                key={JSON.stringify(item)}>
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
                                        source={logoImg}
                                        resizeMode={FastImage.resizeMode.contain}
                                      />
                                      <Body>
                                          <View style={styles.itemHeader}>
                                              <Text style={styles.nameText}>
                                                  {item}
                                              </Text>
                                              <Text style={[styles.note, styles.span]}>
                                                  主任医师
                                              </Text>
                                          </View>

                                          <Text style={styles.note}>河南开封中心医院 皮肤科</Text>
                                          <Text  style={[styles.note, styles.strong]}>擅长：皮炎湿疹皮炎湿疹皮炎湿疹皮炎湿疹…</Text>
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
export default withCheckAppUpdate(withLoginModal(Home));
