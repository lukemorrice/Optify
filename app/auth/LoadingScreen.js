import React, {Component} from 'react';
import {Alert, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import firebase from 'firebase';
import Loading from './Loading';
import {WHITE} from '../Style';

export default class LoadingScreen extends Component {
  state = {
    alertedNoConnection: false,
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor(WHITE);
    // const unsubscribe = NetInfo.addEventListener((state) =>
    //   this.handleConnectivityChange(state, unsubscribe),
    // );
  }

  // handleConnectivityChange = (state, unsubscribe) => {
  //   console.log(unsubscribe());
  //   if (state.isConnected) {
  //     unsubscribe();
  // firebase.auth().onAuthStateChanged((user) => {
  //   this.props.navigation.navigate(user ? 'App' : 'Auth');
  // });
  //   } else {
  //     if (!this.state.alertedNoConnection) {
  //       this.setState({alertedNoConnection: true});
  //       Alert.alert(
  //         'Optify requires an internet connection, please check your network',
  //       );
  //     }
  //   }
  // };

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
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
    }
  };

  handleFirstConnectivityChange = (isConnected) => {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );

    if (isConnected === false) {
      Alert.alert(
        'Optify requires an internet connection, please check your network',
      );
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        this.props.navigation.navigate(user ? 'App' : 'Auth');
      });
    }
  };

  render() {
    this.checkConnectivity();
    return <Loading />;
  }
}
