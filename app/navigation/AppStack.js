import {createStackNavigator} from 'react-navigation-stack';
import HomeContainer from '../home/HomeContainer';
import AddGoalContainer from '../home/AddGoalContainer';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeContainer,
    },
    AddGoal: {
      screen: AddGoalContainer,
    },
  },
  {
    headerMode: 'none',
  },
);

export default AppStack;
