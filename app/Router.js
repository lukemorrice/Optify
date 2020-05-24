import React, {Component} from 'react';
import {View} from 'react-native';
import {Router, Stack, Scene, Tabs} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LandingPage from './components/auth/LandingPage';
import Settings from './components/settings/Settings';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';

class TabIcon extends Component {
  render() {
    return (
      <View style={{marginTop: 5}}>
        <Icon
          style={{color: this.props.focused ? '#34495E' : '#B8BBC4'}}
          name={this.props.name}
          size={26}></Icon>
      </View>
    );
  }
}

export default RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="landing" component={LandingPage} initial />
        <Scene key="login" component={Login} />
        <Scene key="signup" component={Signup} />
      </Stack>
      <Stack
        key="app"
        style={{backgroundColor: 'blue'}}
        hideNavBar
        panHandlers={null}>
        <Tabs
          showLabel={false}
          activeTintColor={'#34495E'}
          inactiveTintColor={'#B8BBC4'}>
          <Scene
            key="profile"
            component={Profile}
            icon={TabIcon}
            name={'ios-person'}
            hideNavBar
          />
          <Scene
            key="home"
            component={Home}
            icon={TabIcon}
            name={'ios-home'}
            initial
            hideNavBar
          />
          <Scene
            key="settings"
            component={Settings}
            icon={TabIcon}
            name={'ios-settings'}
            hideNavBar
          />
        </Tabs>
      </Stack>
    </Stack>
  </Router>
);
