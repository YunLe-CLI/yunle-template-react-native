import React from 'react';
import {Platform, View, StyleSheet, findNodeHandle, NativeModules} from 'react-native';

var { requireNativeComponent } = require('react-native');
const { RNYSXVideoManager = {} } = NativeModules || {};

export default class YXSVideoView extends React.Component {
    get _module() {
        return Platform.OS === 'ios'
            ? NativeModules.RNYSXVideoManager
            : {};
    }

    // componentWillUnmount() {
    //     this._module.destroy(findNodeHandle(this._player));
    // }
    componentDidMount(): void {
        if (this.setIntervalSetUid) {
            clearInterval(this.setIntervalSetUid);
            this.setIntervalSetUid = null;
        }
        this.setIntervalSetUid = setInterval(() => {
            this.setUid();
        }, 3000)
    }

    componentWillUnmount(): void {
        if (this.setIntervalSetUid) {
            clearInterval(this.setIntervalSetUid);
            this.setIntervalSetUid = null;
        }
    }

    setUid = (uid) => {
        try {
            // this._module.setUid(uid || this.props.uid, findNodeHandle(this._RNVideoView));
            this._RNVideoView.setNativeProps({
                uid: this.props.uid
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View style={[this.props.style, {
                overflow: 'hidden'
            }]}>
                <RNVideoView
                    uid={this.props.uid}
                    ref={r => {
                        this._RNVideoView = r;
                    }}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        );
    }
}

const RNVideoView = requireNativeComponent('RNYSXVideo', YXSVideoView);