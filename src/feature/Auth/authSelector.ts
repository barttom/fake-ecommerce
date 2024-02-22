import {AppState} from '../../common/redux';
import {AuthState} from './authSlice';

export const selectIsAuthenticated = (
  state: AppState,
): AuthState['isAuthenticated'] => state.auth.isAuthenticated;

export const selectUser = (state: AppState): AuthState['user'] =>
  state.auth.user;

export const selectMe = (state: AppState): AuthState['me'] => state.auth.me;
