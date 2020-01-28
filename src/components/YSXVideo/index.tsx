import React from 'react';
import {Platform, View, StyleSheet, findNodeHandle, NativeModules} from 'react-native';

var { requireNativeComponent } = require('react-native');
const { RNYSXVideoManager } = NativeModules || {};

export default class YXSVideoView extends React.Component {
    get _module() {
        return Platform.OS === 'ios'
            ? (NativeModules.RNYSXVideoManager ? NativeModules.RNYSXVideoManager : {})
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
                {
                    RNVideoView ? (
                      <RNVideoView
                        uid={this.props.uid}
                        ref={r => {
                            this._RNVideoView = r;
                        }}
                        style={StyleSheet.absoluteFill}
                      />
                    ) : undefined
                }
            </View>
        );
    }
}

const RNVideoView = (() => {
    let NODE = undefined;
    try {
        if (RNYSXVideoManager) {
            NODE = requireNativeComponent('RNYSXVideo', YXSVideoView);
        }
    } catch (e) {

    }
    return NODE;
})();