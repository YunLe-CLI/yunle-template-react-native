import React from 'react';
import {View, StyleSheet} from 'react-native';

var { requireNativeComponent } = require('react-native');

export default class YXSVideoView extends React.Component {
    // get _module() {
    //     return Platform.OS === 'ios'
    //         ? NativeModules.ApsaraPlayerManager
    //         : NativeModules.ApsaraPlayerModule;
    // }

    // componentWillUnmount() {
    //     this._module.destroy(findNodeHandle(this._player));
    // }

    render() {
        return (
            <View style={this.props.style}>
                <RNVideoView
                    ref={r => {
                        this._player = r;
                    }}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        );
    }
}

const RNVideoView = requireNativeComponent('RNVideoView', YXSVideoView, {

});