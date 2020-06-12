import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Nav from './navigation/Navigation';
import reducer from './reducers';

export default class Main extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <Nav />
      </Provider>
    );
  }
}
