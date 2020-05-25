import React, {Component} from 'react';
import firebase from 'firebase';
import Main from './app/Main';
import {firebaseConfig} from './config/';

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.log('Firebase initialization error: ', error.message);
}

export default class App extends Component {
  render() {
    return <Main />;
  }
}
