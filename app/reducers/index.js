import {combineReducers} from 'redux';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import goals from './GoalsReducer';

export default combineReducers({
  auth: auth,
  profile: profile,
  goals: goals,
});
