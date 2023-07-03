import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AuthState = {
  isAuthenticated: boolean;
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
});

export const {
  actions: {setAuth},
  reducer: authReducer,
} = authSlice;
