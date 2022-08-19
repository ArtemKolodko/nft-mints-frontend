import { RootState } from '../store';

export const selectCurrentUser = (state : RootState) => state.user.currentUser;

export const selectCheckLogin = (state: RootState) => {return ({checkedLogin: state.user.checkedLogin, checkingLogin: state.user.checkingLogin})}