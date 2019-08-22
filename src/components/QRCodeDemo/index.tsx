import React from 'react';
import {StatusBar, Dimensions, View, TouchableOpacity} from 'react-native';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Dispatch} from 'redux';
import {
    Theme,
    UpdateTheme,
    withTheme,
    ThemeConsumer,
    Button,
    Header,
    Divider,
    Text,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export interface IProps {
    navigation: any;
    client: any;
    dispatch: Dispatch<{}>;
}
class QRCodeDemo extends React.Component<IProps> {
    static navigationOptions = ({ navigation }: any) => {
        const { getParam } = navigation;
        return ({
            header: null,
            title: getParam('title'),
        });
    }
    state = {
        isShow: false,
        isModalVisible: false,
        content: '',
    }
    scanner: any = null;
    onSuccess = (data: any) => {
        console.log(data)
        this.setState({
            isModalVisible: true,
            content: data.data,
        })
    }
    componentWillUnmount() {
        StatusBar.setBarStyle('default', true);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#222' }}>
                <NavigationEvents
                    onWillFocus={() => {
                        StatusBar.setBarStyle('light-content', true);
                    }}
                    onDidFocus={() => {
                        StatusBar.setBarStyle('light-content', true);
                        this.setState({
                            isShow: true,
                        })
                    }}
                    onWillBlur={() => {
                        StatusBar.setBarStyle('default', true);
                        this.setState({
                            isShow: true,
                        })
                    }}
                    onDidBlur={() => {
                        StatusBar.setBarStyle('default', true);
                    }}
                />
                <Header
                    leftComponent={<TouchableOpacity
                        style={{
                            paddingHorizontal: 15,
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            const { dispatch } = this.props;
                            dispatch(NavigationActions.back());
                        }}
                    >
                        <Icon name="angle-left" size={28} color="#fff" />
                    </TouchableOpacity>}
                    centerComponent={{ text: '二维码扫一扫', style: { color: '#fff' } }}
                />
                <View style={{ flex: 1, flexGrow: 1, width, height }}>
                    {
                        this.state.isShow && <QRCodeScanner
                            ref={e => this.scanner = e}
                            onRead={this.onSuccess}
                            topContent={undefined}
                            bottomContent={undefined}
                        />
                    }
                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => {
                        this.setState({
                            isModalVisible: false,
                            content: ''
                        }, () => {
                            if (this.scanner) {
                                this.scanner.reactivate()
                            }
                        });
                    }}
                    onBackdropPress={() => {
                        this.setState({
                            isModalVisible: false,
                            content: ''
                        }, () => {
                            if (this.scanner) {
                                this.scanner.reactivate()
                            }
                        });
                    }}
                >
                    <View style={{
                        paddingVertical: 15,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}>
                        <Text>
                            {this.state.content}
                        </Text>
                        <View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {
            dispatch,
        }
    },)(withTheme(withApollo(QRCodeDemo)));
