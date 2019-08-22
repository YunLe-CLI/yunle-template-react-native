import React from 'react';
import { Dimensions, StyleSheet, View, StatusBar} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import LottieView from "lottie-react-native";
import { NavigationActions } from "react-navigation";
import {
    Theme,
    UpdateTheme,
    withTheme,
} from 'react-native-elements';

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

    goToMain = () => {
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'Main',
            params: {},
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <LottieView
                    autoPlay
                    loop={false}
                    source={require('./assets/LottieLogo1.json')}
                    onAnimationFinish={() => {
                        this.goToMain()
                    }}
                />
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
      backgroundColor: '#01D1C2',
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
