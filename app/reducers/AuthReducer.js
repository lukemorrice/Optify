import {
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGOUT_USER,
  RESET_ERRORS,
} from '../actions/types';

const INITIAL_STATE = {
  errorLogging: '',
  errorCreating: '',
  loading: false,
  user: null,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CREATE_USER:
      return {...state, ...INITIAL_STATE, loading: true, user: action.payload};
    case AUTH_CREATE_USER_FAIL:
      return {
        ...state,
        errorCreating: action.payload,
        errorLogging: '',
        loading: false,
      };
    case AUTH_CREATE_USER_SUCCESS:
      return {...state, loading: false, errorLogging: '', errorCreating: ''};
    case AUTH_LOGIN_USER:
      return {...state, ...INITIAL_STATE, loading: true, user: action.payload};
    case AUTH_LOGIN_USER_FAIL:
      return {
        ...state,
        errorLogging: action.payload,
        errorCreating: '',
        loading: false,
      };
    case AUTH_LOGIN_USER_SUCCESS:
      return {...state, loading: false, errorLogging: '', errorCreating: ''};
    case AUTH_LOGOUT_USER:
      return {...state, loading: false, errorLogging: '', errorCreating: ''};
    case RESET_ERRORS:
      return {...state, errorLogging: '', errorCreating: ''};
    default:
      return state;
  }
};

export default auth;
