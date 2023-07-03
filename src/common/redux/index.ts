import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../../feature/Auth';

const rootReducer = combineReducers({
  authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
