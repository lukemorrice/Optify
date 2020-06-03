import {
  PROFILE_FETCH,
  PROFILE_UPDATE_GOALS,
  PROFILE_UPDATE_CATEGORIES,
} from '../actions/types';

const INITIAL_STATE = {};

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FETCH:
      return {...state, profile: action.payload};
    case PROFILE_UPDATE_GOALS:
      return {...state};
    case PROFILE_UPDATE_CATEGORIES:
      return {...state};
    default:
      return state;
  }
};

export default profile;
