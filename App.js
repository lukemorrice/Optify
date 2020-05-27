import React, {Component} from 'react';
import firebase from 'firebase';
import Main from './app/Main';
import {firebaseConfig} from './config/';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

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
