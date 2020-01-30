import React from 'react';
import {Platform, View, StyleSheet, findNodeHandle, NativeModules} from 'react-native';

var { requireNativeComponent } = require('react-native');
const { RNYSXRemoteShareManager } = NativeModules || {};
console.log(RNYSXRemoteShareManager, 12132312)
export default class RNYSXRemoteShare extends React.Component {
    get _module() {
        return Platform.OS === 'ios'
            ? (NativeModules.RNYSXRemoteShareManager ? NativeModules.RNYSXRemoteShareManager : {})
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
                activeShareID: this.props.activeShareID
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
                    RNYSXRemoteShareView ? (
                      <RNYSXRemoteShareView
                        activeShareID={this.props.activeShareID}
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

const RNYSXRemoteShareView = (() => {
    let NODE = undefined;
    try {
        if (RNYSXRemoteShareManager) {
            NODE = requireNativeComponent('RNYSXRemoteShare', RNYSXRemoteShareView);
        }
    } catch (e) {
        alert(e)
    }
    return NODE;
})();