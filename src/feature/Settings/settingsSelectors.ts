import {AppState} from '../../common/redux';

export const selectTheme = (state: AppState) =>
  state.settingsReducer.deviceTheme;
