import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Auth stack
import LandingPage from './components/auth/LandingPage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import LoadingScreen from './components/auth/LoadingScreen';

// App stack
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';

const AppStack = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" size={26} color={tintColor} />
        ),
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-home" size={26} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-settings" size={26} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#34495E',
      inactiveTintColor: '#B8BBC4',
      showLabel: false,
      style: {
        backgroundColor: '#F4F4F4',
        paddingTop: 10,
        justifyContent: 'center',
      },
    },
    initialRouteName: 'Home',
  },
);

const AuthStack = createStackNavigator({
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

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

export default Navigator;
