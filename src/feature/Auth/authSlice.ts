import {createSlice} from '@reduxjs/toolkit';
import {rootApi} from '../../common/api';
import {AuthenticatedUser, User} from '../../common/api/apiTypes';
import {deleteCacheItem, getCacheItem, setCacheItem} from '../../common/cache';

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
  me?: AuthenticatedUser;
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
};
const cachedUser = getCacheItem('user');
const cachedAuthenticatedUser = getCacheItem('authenticatedUser');

const authSlice = createSlice({
  name: 'auth',
  initialState: cachedUser
    ? {
        isAuthenticated: true,
        user: cachedUser,
        me: cachedAuthenticatedUser,
      }
    : initialAuthState,
  reducers: {
    logOut: state => {
      state.isAuthenticated = false;
      state.user = undefined;
      state.me = undefined;
      deleteCacheItem('user');
      deleteCacheItem('authenticatedUser');
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      rootApi.endpoints.authenticateUser.matchFulfilled,
      (state, {payload}) => {
        state.isAuthenticated = !!payload;
        state.user = {...payload};
        setCacheItem('user', payload);
      },
    );
    builder.addMatcher(
      rootApi.endpoints.authenticateUser.matchRejected,
      state => {
        state.isAuthenticated = false;
        state.user = undefined;
        deleteCacheItem('user');
        deleteCacheItem('authenticatedUser');
      },
    );
    builder.addMatcher(
      rootApi.endpoints.authenticatedUser.matchFulfilled,
      (state, {payload}) => {
        state.me = payload;
        setCacheItem('authenticatedUser', payload);
      },
    );
  },
});

export const {
  actions: {logOut},
  reducer: authReducer,
} = authSlice;
