import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View, StatusBar} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import FastImage from 'react-native-fast-image';
import LottieView from "lottie-react-native";
import {WebView} from "react-native-webview";

export interface IProps {
    navigation: any;
    client: any;
    dispatch: Dispatch<{}>;
}
class Splash extends React.Component<IProps> {
    componentDidMount() {
        console.log(this.props)
    }
    componentWillUnmount() {
        setTimeout(() => {
            StatusBar.setHidden(false, 'slide')
        }, 100);
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ height: 300 }}>
                    <LottieView
                        source={require('./assets/LottieLogo1.json')}
                        autoPlay
                        loop
                    />
                </View>
                <View>
                    <FastImage
                        style={{ width: 200, height: 200 }}
                        source={{
                            uri: 'https://unsplash.it/400/400?image=1',
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View>
                    <WebView style={{ width: 200, height: 200 }} source={{ uri: 'https://facebook.github.io/react-native/' }} />
                </View>
            </ScrollView>
        );
    }
}

export default connect(app => app)(withApollo(Splash));


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
