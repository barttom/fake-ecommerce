import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootApi} from '../api';
import {cartReducer} from '../../feature/Cart/';
import {settingsReducer} from '../../feature/Settings/';
import {authReducer} from '../../feature/Auth';

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
  settingsReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<AppState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(rootApi.middleware),
    preloadedState,
  });
};
export const initialStore: any = setupStore();

export type AppDispatch = typeof initialStore.dispatch;
export type AppState = ReturnType<typeof initialStore.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
