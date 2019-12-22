import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from "react-native";

export default class Loading extends PureComponent {
  render() {
    return <View style={[styles.container]}>
      <View>
        <Text style={[styles.h1]}>
          Loading...
        </Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
  }
});
