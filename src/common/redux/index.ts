import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';
import {rootApi, stripeApi} from '../api';
import {cartReducer} from '../../feature/Cart/';
import {settingsReducer} from '../../feature/Settings/';
import {authReducer} from '../../feature/Auth';
import {ordersReducer} from '../../feature/Orders';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  settings: settingsReducer,
  orders: ordersReducer,
  [rootApi.reducerPath]: rootApi.reducer,
  [stripeApi.reducerPath]: stripeApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<AppState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(rootApi.middleware, stripeApi.middleware),
    preloadedState,
  });
};
export const initialStore: any = setupStore();

export type AppDispatch = typeof initialStore.dispatch;
export type AppState = ReturnType<typeof initialStore.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

setupListeners(initialStore.dispatch);
