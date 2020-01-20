import React from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';

import open from '@/theme/Theme_Education/components/OpenFileViewer';

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
                <Content style={{ backgroundColor: '#fff' }}>
                    <List style={{ backgroundColor: '#fff', marginTop: 12, borderRadius: 5 }}
                          listNoteColor={'#E3E7EF'}
                    >
                        {
                            (this.state.list).map((item: fileType) => {
                                return <ListItem noIndent onPress={async () => {
                                    await open(item.url, item.title)
                                }}>
                                    <Left>
                                        <Text style={styles.itemText}>{item.title}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
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
