import React from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { getOnlineAppVersion } from '@/services/api'

import nativeAutoUpdate from '@/utils/native-auto-update';
import open from '@/theme/Theme_Education_000/components/OpenFileViewer'

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
        const { coursewares = [], title = '' } = navigation.state.params;
        this.setState({
            list: coursewares
        })
    }

    render() {
        const { navigation } = this.props;
        const { coursewares = [], title = '' } = navigation.state.params;
        return (
            <Container style={styles.container}>
                <Header
                  transparent
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
                            <Icon style={{ color: '#fff', fontSize: 25, }} color={'#333333'} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ }}>
                    <List style={{ marginTop: 12, borderRadius: 5 }}
                          listNoteColor={'#E3E7EF'}
                    >
                        {
                            (coursewares).map((item: fileType) => {
                                return <ListItem
                                  style={styles.item}
                                  noIndent onPress={async () => {
                                    await open(item.url, item.title)
                                }}>
                                    <Left>
                                        <Text style={styles.itemText}>{item.title}</Text>
                                    </Left>
                                    <Right>
                                        <Icon style={{
                                            fontSize: 12,
                                            color: '#595959',
                                        }} name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}
export default Home;
