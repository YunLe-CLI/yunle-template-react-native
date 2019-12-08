import React from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';


export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    state = {
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent
                                onPress={() => {
                                    const { dispatch } = this.props;
                                    dispatch(NavigationActions.back());
                                }}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>设置</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ paddingHorizontal: 24 }}>
                    <List>
                        <ListItem onPress={() => {
                            this.props.dispatch(NavigationActions.navigate({
                                routeName: 'Setting',
                                params: {},
                            }));
                        }}>
                            <Text>设置</Text>
                        </ListItem>
                    </List>
                    <Button
                        style={{
                            marginTop: 20,
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            const { dispatch } = this.props;
                            dispatch({
                                type: 'auth/logout'
                            });
                        }}
                    >
                        <Text>推出登陆</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
export default Home;
