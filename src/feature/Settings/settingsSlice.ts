import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCacheItem, setCacheItem} from '../../common/cache';

export type SettingsState = {
  deviceTheme: 'light' | 'dark' | 'auto';
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
  },
});

export const {
  actions: {setTheme},
  reducer: settingsReducer,
} = settingsSlice;
