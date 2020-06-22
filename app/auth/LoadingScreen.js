import React, {Component} from 'react';
import {Alert, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import Loading from './Loading';

export default class LoadingScreen extends Component {
  checkConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.fetch().then((isConnected) => {
        if (isConnected) {
          firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
          });
        } else {
          Alert.alert(
            'Optify requires an internet connection, please check your network',
          );
        }
      });
    } else {
      // For iOS devices
      NetInfo.addEventListener((state) => {
        if (state.isConnected === false) {
          Alert.alert(
            'Optify requires an internet connection, please check your network',
          );
        } else {
          firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
          });
        }
      });
    }
  };

  render() {
    this.checkConnectivity();
    return <Loading />;
  }
}
