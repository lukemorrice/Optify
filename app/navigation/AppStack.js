import {createStackNavigator} from 'react-navigation-stack';
import Home from '../home/Home';
import AddGoal from '../home/AddGoal';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    AddGoal: {
      screen: AddGoal,
    },
  },
  {
    headerMode: 'none',
  },
);

export default AppStack;
