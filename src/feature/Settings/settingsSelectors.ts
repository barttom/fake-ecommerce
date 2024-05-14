import {AppState} from '../../common/redux';
import {SettingsState} from './settingsSlice';

export const selectTheme = (state: AppState) => state.settings.deviceTheme;
export const selectDeliveryData = (
  state: AppState,
): SettingsState['deliveryData'] => state.settings.deliveryData;
