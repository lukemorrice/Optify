import {combineReducers} from 'redux';
import auth from './AuthReducer';
import profile from './ProfileReducer';

export default combineReducers({
  auth: auth,
  profile: profile,
});
