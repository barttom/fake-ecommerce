import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../../feature/Auth';
import {rootApi} from '../api';

const rootReducer = combineReducers({
  authReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
