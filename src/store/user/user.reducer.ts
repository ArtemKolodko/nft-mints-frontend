import { AnyAction } from 'redux';
import { USER_ACTION_TYPES } from './user.types';

export const USER_INITIAL_STATE = {
  currentUser: null,
  checkingLogin: false,
  checkedLogin: false,
};

export const userReducer = (state = USER_INITIAL_STATE, action : AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.LOGOUT_CURRENT_USER:
      return { ...state, currentUser: null, checkingLogin: false, checkedLogin: false }
    case USER_ACTION_TYPES.CHECKING_LOGIN_USER:
      return { ...state, checkingLogin: true, checkedLogin: false, }
    case USER_ACTION_TYPES.CHECK_LOGIN_USER:
      return { ...state, currentUser: payload, checkingLogin: false, checkedLogin: true }
    default:
      return state;
  }
};
