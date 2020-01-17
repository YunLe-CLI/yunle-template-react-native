import { createStackNavigator } from "react-navigation-stack";
import { fromBottom } from 'react-navigation-transitions';
import * as routerConf from "@/theme/Theme_Hospital/pages";
import { getActiveRoute } from '@/utils/utils';

const HomeStack = createStackNavigator(
    {
        ...routerConf
    },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: ({ navigation }) => {
      let tabBarVisible: boolean = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      const activeRoute = getActiveRoute(navigation.state);
      if (activeRoute.key.indexOf('__RELOAD__') > -1) {

      }
      console.log('TEST_NNN', activeRoute)
      return {
        tabBarVisible,
      };
    },
  }
);

export default HomeStack;
