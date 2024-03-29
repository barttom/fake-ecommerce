import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ToggleButton} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../common/redux';
import {selectTheme} from './settingsSelectors';
import {setTheme, SettingsState} from './settingsSlice';

export const ThemeSettings = () => {
  const deviceTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const handleChangeDeviceTheme = useCallback(
    async (value: string) => {
      if (value) {
        dispatch(setTheme(value as SettingsState['deviceTheme']));
      }
    },
    [dispatch],
  );

  return (
    <View style={styles.wrapper}>
      <ToggleButton.Row
        onValueChange={handleChangeDeviceTheme}
        value={deviceTheme}>
        <ToggleButton icon="brightness-5" value="light" />
        <ToggleButton icon="brightness-auto" value="auto" />
        <ToggleButton icon="brightness-4" value="dark" />
      </ToggleButton.Row>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
