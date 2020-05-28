import {createStackNavigator} from 'react-navigation-stack';
import Home from '../components/home/Home';
import Settings from '../components/settings/Settings';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        gestureResponseDistance: {vertical: 800},
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
  },
);

export default AppStack;
