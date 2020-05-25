import {createStackNavigator} from 'react-navigation-stack';
import LandingPage from '../components/auth/LandingPage';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

export default AuthStack = createStackNavigator({
  LandingPage: {
    screen: LandingPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
});
