import React from 'react';
import { Platform, TouchableOpacity, ScrollView, Dimensions, StyleSheet, View, StatusBar} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import FastImage from 'react-native-fast-image';
import {WebView} from "react-native-webview";
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation-locker';
import { NavigationActions } from "react-navigation";
import DeviceInfo from 'react-native-device-info';
import {
    Text,
    Theme,
    UpdateTheme,
    withTheme,
    ThemeConsumer,
    Button,
    Header,
    Divider,
} from 'react-native-elements';

import ShareUtil from '@/utils/umeng/ShareUtil';

let shareURL = '';

if (Platform.OS === 'ios') {
    shareURL = 'https://www.pgyer.com/dgz-blog-i';
}

if (Platform.OS === 'android') {
    shareURL = 'https://www.pgyer.com/dgz-blog-a';
}


export interface IProps {
    navigation: any;
    client: any;
    dispatch: Dispatch<{}>;
    handleChangeTheme: Function;
    theme: Theme;
    updateTheme: UpdateTheme;

}
class Splash extends React.Component<IProps> {
    state = {
        slider1ActiveSlide: 1,
    };
    componentDidMount() {
        // PushUtil.appInfo((...dd) => {
        //     console.log(dd)
        // }, (...dd) => {
        //     console.log(dd)
        // })
    }
    componentWillUnmount() {
        setTimeout(() => {
            StatusBar.setHidden(false, 'slide')
        }, 100);
    }

    gotoQRCodePage = (data: any) => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'QRCodeDemo',
            params: {},
        }))
    }

    handleShareQQ = (text: string, img: string, url: string, title: string) => {
        const imageUrl = 'https://www.hexiao-o.com/static/author-photo.png';
        ShareUtil.share(text, encodeURI(imageUrl), encodeURI(url), title, 0, (code: number, message: any) => {
            console.log("share succeed, map: ", code, message);
        });
    }

    handleShareSina = (text: string, img: string, url: string, title: string) => {
        const imageUrl = 'https://www.hexiao-o.com/static/author-photo.png';
        ShareUtil.share(text, encodeURI(imageUrl), encodeURI(url), title, 1, (code: number, message: any) => {
            console.log("share succeed, map: ", code, message);
        });
    }

    handleShareWechat = (text: string, img: string, url: string, title: string) => {
        const imageUrl = 'https://www.hexiao-o.com/static/author-photo.png';
        ShareUtil.share(text, encodeURI(imageUrl), encodeURI(url), title, 2, (code: number, message: any) => {
            console.log("share succeed, map: ", code, message);
        });
    }

    renderDivider = () => {
        return (
            <ThemeConsumer>
                {({ theme }: any) => (
                    <Divider style={{ marginVertical: 10 }} />
                )}
            </ThemeConsumer>
        )
    }

    render() {
        const version = DeviceInfo.getVersion();
        const buildNumber = DeviceInfo.getBuildNumber();
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                    rightComponent={
                        <TouchableOpacity
                            onPress={this.gotoQRCodePage}
                            style={{
                                paddingHorizontal: 15,
                                alignItems: 'center',
                            }}
                        >
                            <Icon name="qrcode" size={18} color="#fff" />
                        </TouchableOpacity>
                    }
                />
                <ScrollView style={styles.container}>
                    <View style={{ padding: 15 }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>version: {version}({buildNumber})</Text>
                        </View>
                        {this.renderDivider()}
                    <Button
                        title="UI主题库"
                        onPress={() => {
                            this.props.dispatch(NavigationActions.navigate({
                                routeName: 'ElementsDemo',
                                params: {},
                            }))
                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="QQ登录"
                        onPress={() => {
                            console.log(1111, ShareUtil, this.props);
                            try {
                                ShareUtil.auth(0,(code: number, result: any ,message: any) =>{
                                    console.log(code, result, message);
                                });
                            } catch (e) {
                                console.log(e)
                            }

                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="微信登录"
                        onPress={() => {
                            try {
                                ShareUtil.auth(2,(code: number, result: any ,message: any) =>{
                                    console.log(code, result, message);
                                });
                            } catch (e) {
                                console.log(e)
                            }

                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="微信分享"
                        onPress={() => {
                            try {
                                this.handleShareWechat('微信分享内容', '微信分享', shareURL, '微信分享标题')
                            } catch (e) {
                                console.log(e)
                            }

                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="QQ分享"
                        onPress={() => {
                            try {
                                this.handleShareQQ('QQ分享内容', '微信分享', shareURL, 'QQ分享标题')
                            } catch (e) {
                                console.log(e)
                            }

                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="微博分享"
                        onPress={() => {
                            try {
                                this.handleShareSina('微博分享内容', '微博分享', shareURL, '微博分享标题')
                            } catch (e) {
                                console.log(e)
                            }

                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="设置坚屏"
                        onPress={() => {
                            Orientation.lockToPortrait()
                        }}
                    />
                    {this.renderDivider()}
                    <Button
                        title="设置横屏"
                        onPress={() => {
                            Orientation.lockToLandscape()
                        }}
                    />
                        {this.renderDivider()}
                    <View>
                        <FastImage
                            style={{ width: '100%', height: 200 }}
                            source={{
                                uri: 'https://unsplash.it/400/400?image=1',
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    {this.renderDivider()}
                    <View>
                        <WebView style={{ width: '100%', height: 500 }} source={{ uri: 'https://facebook.github.io/react-native/blog/' }} />
                    </View>
                    {this.renderDivider()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(undefined, (dispatch) => {
    return {
        dispatch,
        handleChangeTheme: (theme: {}) => dispatch({ type: 'app/changeTheme', payload: theme })
    }
},)(withTheme(withApollo(Splash)));


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').width / (1125 / 1290),
  },
  text: {
    alignItems: 'center',
  },
  hero: {
    fontSize: 20,
    color: '#999',
  },
  appName: {
    padding: 15,
    fontSize: 40,
  },
  version: {
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    color: '#ccc',
  },
  progressWrap: {
    alignSelf: 'center',
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: '#e5e5e5',
  },
});
