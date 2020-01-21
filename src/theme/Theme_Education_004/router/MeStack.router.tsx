import { createStackNavigator } from "react-navigation-stack";
import { fromRight } from 'react-navigation-transitions';
import * as routerConf from "../pages";

const MeStack = createStackNavigator(
    {
        ...routerConf,
    },
  {
    initialRouteName: 'Me',
    headerMode: 'none',
    transitionConfig: () => fromRight(),
    navigationOptions: ({ navigation }) => {
      let tabBarVisible: boolean = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    }
  }
);

export default MeStack;
