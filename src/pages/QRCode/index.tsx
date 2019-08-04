import React from 'react';
import {StatusBar, Dimensions, View} from 'react-native';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation'; // Version can be specified in package.json
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Dispatch} from "redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export interface IProps {
    navigation: any;
    client: any;
    dispatch: Dispatch<{}>;
}
class QRCode extends React.Component<IProps> {
    static navigationOptions = ({ navigation }: any) => {
        const { getParam } = navigation;
        return ({
            header: null,
            title: getParam('title'),
        });
    }
    onSuccess = (data: any) => {
        console.log(data)
    }
    componentWillUnmount() {
        StatusBar.setBarStyle('default', true);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <NavigationEvents
                    onWillFocus={() => {
                        StatusBar.setBarStyle('light-content', true);
                    }}
                    onDidBlur={() => {
                        StatusBar.setBarStyle('default', true);
                    }}
                />
                <View style={{ flex: 1, flexGrow: 1, width, height }}>
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        topContent={undefined}
                        bottomContent={undefined}
                    />
                </View>
            </View>
        );
    }

}

export default connect()(withApollo(QRCode))
