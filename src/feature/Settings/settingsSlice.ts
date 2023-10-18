import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type SettingsState = {
  deviceTheme: 'light' | 'dark' | 'auto';
};

export const initialSettingsState: SettingsState = {
  deviceTheme: 'auto',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    setTheme: (
      state,
      {payload}: PayloadAction<SettingsState['deviceTheme']>,
    ) => {
      state.deviceTheme = payload;
    },
  },
});

export const {
  actions: {setTheme},
  reducer: settingsReducer,
} = settingsSlice;
