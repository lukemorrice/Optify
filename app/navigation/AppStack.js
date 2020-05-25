import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../components/home/Home';
import Profile from '../components/profile/Profile';
import SettingsNav from '../components/settings/SettingsNav';

export default AppStack = createBottomTabNavigator(
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
    SettingsNav: {
      screen: SettingsNav,
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
