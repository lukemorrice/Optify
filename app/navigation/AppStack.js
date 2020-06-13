import {createStackNavigator} from 'react-navigation-stack';
import Home from '../home/Home';
import HomeContainer from '../home/HomeContainer';
import AddGoal from '../home/AddGoal';
import AddGoalContainer from '../home/AddGoalContainer';

const AppStack = createStackNavigator(
  {
    Home: {
      // screen: Home,
      screen: HomeContainer,
    },
    AddGoal: {
      // screen: AddGoal,
      screen: AddGoalContainer,
    },
  },
  {
    headerMode: 'none',
  },
);

export default AppStack;
