import React from 'react';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { withCheckAppUpdate } from '@/components/CheckAppUpdate'
import { withLoginModal } from '@/components/LoginModal'
import logoImg from '@/components/LoginModal/assets/logo_slices/pic_logo_s.png';
import FastImage from 'react-native-fast-image';

import loading from './assets/loading_slices/loading.png';

export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    state = {
        list: []
    };

    render() {
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
                            <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>

                    </Body>
                    <Right />
                </Header>
                <View scrollEnabled={false} style={{ flex: 1, flexGrow: 1, paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.loadingWrap}>
                      <FastImage
                        style={{
                          width: 48,
                          height: 48,
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}
                        source={loading}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                      <Text style={styles.loadingText}>正在进入，请稍后</Text>
                    </View>
                </View>
            </Container>
        );
    }
}
export default withCheckAppUpdate(withLoginModal(Home));
