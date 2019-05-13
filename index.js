/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);

console.ignoredYellowBox = [
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: isMounted(...) is deprecated',
]
