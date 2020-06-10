import {createStackNavigator} from 'react-navigation-stack';
import Home from '../components/home/Home';
import AddGoal from '../components/home/AddGoal';

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
