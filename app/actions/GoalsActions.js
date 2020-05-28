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
          length = snapshot.data().length;
          randomGoals = [];
          randomIdxs = [];
          for (var i = 0; i < 3; i++) {
            do randomIdx = generateRandomNumber(length);
            while (randomIdxs.includes(randomIdx));
            randomIdxs.push(randomIdx);
            randomGoal = list[randomIdx];
            randomGoals.push(randomGoal);
          }

          dispatch({
            type: GOALS_FETCH,
            payload: randomGoals,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

const generateRandomNumber = (maximum) => {
  return Math.floor(Math.random() * (maximum - 1));
};
