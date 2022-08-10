import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

import UserType from '../../types/user.types';

export const setCurrentUser = (user: UserType) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
