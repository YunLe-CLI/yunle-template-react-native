import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack.router';
// import {Button, Icon} from "native-base";

// const BottomTabNavigator = createBottomTabNavigator(
//   {
//     HomeStack: {
//       screen: HomeStack,
//       navigationOptions: () => {
//         return {
//           tabBarVisible: false,
//           tabBarLabel: '首页',
//           tabBarIcon: ({ tintColor }: { tintColor: string }) => (
//               <Icon style={{ color: tintColor }} fontSize={20} name='home' />
//           ),
//         }
//       },
//     },
//   },
//   {
//     initialRouteName: 'HomeStack',
//     tabBarOptions: {
//       inactiveTintColor: '#8C8C8C',
//       activeTintColor: '#FB3A3A',
//     }
//   },
// );

const BottomTabNavigator = createBottomTabNavigator()


export default () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        options={() => ({
          tabBarVisible: false,
        })}
        name="HomeStack" component={HomeStack} />
    </BottomTabNavigator.Navigator>
  )
};
