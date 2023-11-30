import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {rootApi} from '../../common/api';
import {User} from '../../common/api/apiTypes';

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, {payload}: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      rootApi.endpoints.authenticateUser.matchFulfilled,
      (state, {payload}) => {
        state.isAuthenticated = !!payload;
        state.user = {...payload};
      },
    );
    builder.addMatcher(
      rootApi.endpoints.authenticateUser.matchRejected,
      state => {
        state.isAuthenticated = false;
        state.user = undefined;
      },
    );
  },
});

export const {
  actions: {setAuth},
  reducer: authReducer,
} = authSlice;
