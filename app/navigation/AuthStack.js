import {createStackNavigator} from 'react-navigation-stack';
import LandingPage from '../auth/LandingPage';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';

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
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerShown: false,
    },
  },
});
