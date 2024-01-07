import {AppState} from '../../common/redux';

export const selectTheme = (state: AppState) => state.settings.deviceTheme;
