import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCacheItem, setCacheItem} from '../../common/cache';
import {AuthenticatedUser, UserAddress} from '../../common/api/apiTypes';

export type SettingsState = {
  deviceTheme: 'light' | 'dark' | 'auto';
  deliveryData?: Pick<
    AuthenticatedUser,
    'firstName' | 'lastName' | 'email' | 'phone'
  > &
    Pick<UserAddress, 'address' | 'postalCode' | 'city'>;
};
const cacheSettings = getCacheItem('settings');

export const initialSettingsState: SettingsState = {
  deviceTheme: 'auto',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: cacheSettings || initialSettingsState,
  reducers: {
    setTheme: (
      state,
      {payload}: PayloadAction<SettingsState['deviceTheme']>,
    ) => {
      state.deviceTheme = payload;
      setCacheItem('settings', state);
    },
    setDeliveryData: (
      state,
      {payload}: PayloadAction<SettingsState['deliveryData']>,
    ) => {
      state.deliveryData = payload;
      setCacheItem('settings', state);
    },
  },
});

export const {
  actions: {setTheme, setDeliveryData},
  reducer: settingsReducer,
} = settingsSlice;
