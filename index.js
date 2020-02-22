/**
 * @format
 */

// fix https://github.com/kmagiera/react-native-gesture-handler/issues/320
// fix https://github.com/react-navigation/react-navigation/issues/6361
import 'react-native-gesture-handler'
import 'react-native-root-siblings'
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

console.disableYellowBox = true;


AppRegistry.registerComponent(appName, () => App);
