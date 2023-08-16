import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootApi} from '../api';
import {authReducer} from '../../feature/Auth';
import {cartReducer} from '../../feature/Cart/';

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
