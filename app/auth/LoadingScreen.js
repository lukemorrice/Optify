import React, {Component} from 'react';
import {Alert, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import Loading from './Loading';

export default class LoadingScreen extends Component {
  async componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
    const isConnected = await this.isNetworkAvailable();

    if (!isConnected) {
      Alert.alert(
        'Optify requires an internet connnection, please check your network',
      );
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        this.props.navigation.navigate(user ? 'App' : 'Auth');
      });
    }
  }

  isNetworkAvailable = async () => {
    const response = await NetInfo.fetch();
    return response.isConnected;
  };

  render() {
    return <Loading />;
  }
}
