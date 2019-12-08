import { createStackNavigator } from "react-navigation-stack";
import { fromBottom } from 'react-navigation-transitions';
import * as routerConf from './router.config';

const authStackRouter = createStackNavigator(
  {
      ...routerConf
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: ({ navigation }) => {
      let tabBarVisible: boolean = true;
      if (navigation.state.index > 0) {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    },
    transitionConfig: () => fromBottom(),
  }
);

export default authStackRouter;
