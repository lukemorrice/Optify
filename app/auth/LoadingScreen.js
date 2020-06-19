import React, {Component} from 'react';
import {Alert, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import Loading from './Loading';

export default class LoadingScreen extends Component {
  state = {
    alertedNoConnection: false,
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
    const unsubscribe = NetInfo.addEventListener((state) =>
      this.handleConnectivityChange(state, unsubscribe),
    );
  }

  handleConnectivityChange = (state, unsubscribe) => {
    console.log('Connection changed:', state);
    if (state.isConnected) {
      unsubscribe();
      firebase.auth().onAuthStateChanged((user) => {
        this.props.navigation.navigate(user ? 'App' : 'Auth');
      });
    } else {
      if (!this.state.alertedNoConnection) {
        this.setState({alertedNoConnection: true});
        Alert.alert(
          'Optify requires an internet connection, please check your network',
        );
      }
    }
  };

  render() {
    return <Loading />;
  }
}
