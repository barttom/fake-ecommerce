import {createSlice} from '@reduxjs/toolkit';
import {rootApi} from '../../common/api';
import {User} from '../../common/api/apiTypes';
import {deleteCacheItem, getCacheItem, setCacheItem} from '../../common/cache';

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
};
const cachedUser = getCacheItem('user');

const authSlice = createSlice({
  name: 'auth',
  initialState: cachedUser
    ? {
        isAuthenticated: true,
        user: cachedUser,
      }
    : initialAuthState,
  reducers: {
    logOut: state => {
      state.isAuthenticated = false;
      state.user = undefined;
      deleteCacheItem('user');
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
      },
    );
  },
});

export const {
  actions: {logOut},
  reducer: authReducer,
} = authSlice;
