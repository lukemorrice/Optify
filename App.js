import React, {Component} from 'react';
import firebase from 'firebase';
import Main from './app/Main';

export default class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyCNOcV-Th6GTvgknPy-ZVO5PTNxF4eILL0',
      authDomain: 'optify-15bc4.firebaseapp.com',
      databaseURL: 'https://optify-15bc4.firebaseio.com',
      projectId: 'optify-15bc4',
      storageBucket: 'optify-15bc4.appspot.com',
      messagingSenderId: '624052809830',
      appId: '1:624052809830:web:9a0c9b7ca1d351b0e8fda7',
    };
    try {
      firebase.initializeApp(config);
    } catch (error) {
      console.log('Firebase initialization error: ', error.message);
    }
  }

  render() {
    return <Main />;
  }
}
