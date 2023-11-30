import {AppState} from '../../common/redux';

export const selectIsAuthenticated = (state: AppState) =>
  state.authReducer.isAuthenticated;
