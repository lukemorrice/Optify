import {GOALS_FETCH} from './types';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const fetchGoals = () => {
  return (dispatch) => {
    try {
      firebase
        .firestore()
        .collection('goalsDB')
        .doc('goals')
        .onSnapshot((snapshot) => {
          list = snapshot.data().goals;
          dispatch({
            type: GOALS_FETCH,
            payload: list,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};
