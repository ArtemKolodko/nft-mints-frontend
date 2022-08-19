import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

import UserType from '../../types/user.types';

export const setCurrentUser = (user: UserType) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const setLoginChecked = (user: UserType | null) => 
  createAction(USER_ACTION_TYPES.CHECK_LOGIN_USER, user);

export const checkingLogin = () => 
  createAction(USER_ACTION_TYPES.CHECKING_LOGIN_USER);

export const logoutCurrentUser = () => 
  createAction(USER_ACTION_TYPES.LOGOUT_CURRENT_USER);
