import { createStackNavigator } from "react-navigation-stack";
import * as routerConf from "@/pages";

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
      return {
        tabBarVisible,
      };
    }
  }
);

export default HomeStack;
