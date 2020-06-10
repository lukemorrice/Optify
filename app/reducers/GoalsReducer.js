import {GOALS_FETCH, CUSTOM_GOALS_FETCH} from '../actions/types';

const INITIAL_STATE = {};

const goals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOALS_FETCH:
      return {...state, goals: action.payload};
    default:
      return state;
  }
};

export default goals;
