import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import {
    Theme,
    UpdateTheme,
    withTheme,
} from 'react-native-elements';

import MainDemo from '@/components/MainDemo'

export interface IProps {
    navigation: any;
    client: any;
    dispatch: Dispatch<{}>;
    handleChangeTheme: Function;
    theme: Theme;
    updateTheme: UpdateTheme;

}
class Home extends React.Component<IProps> {

    render() {
        return (
            <View style={styles.container}>
                <MainDemo />
            </View>
        );
    }
}

export default connect(undefined, (dispatch) => {
    return {
        dispatch,
        handleChangeTheme: (theme: {}) => dispatch({ type: 'app/changeTheme', payload: theme })
    }
},)(withTheme(withApollo(Home)));


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});
