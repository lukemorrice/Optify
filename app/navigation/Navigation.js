import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthStack from './AuthStack';
import RootStackScreen from './AppStack';
import LoadingScreen from '../components/auth/LoadingScreen';

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: RootStackScreen,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

class Nav extends Component {
  render() {
    return <Navigator />;
  }
}

export default Nav;
