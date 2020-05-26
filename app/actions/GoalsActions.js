// import {GOALS_FETCH} from './types';
// import * as firebase from 'firebase';
// import 'firebase/firestore';

// export const fetchGoals = () => {
//   return (dispatch) => {
//     firebase
//       .firestore()
//       .collection('goalsDB')
//       .doc('goals')
//       .onSnapshot((snapshot) => {
//         console.log(snapshot.data().goals);
//         dispatch({
//           type: GOALS_FETCH,
//           payload: snapshot.data().goals[0].title,
//         });
//       });
//   };
// };
