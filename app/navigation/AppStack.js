import {createStackNavigator} from 'react-navigation-stack';
import Home from '../components/home/Home';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    headerMode: 'none',
  },
);

export default AppStack;
