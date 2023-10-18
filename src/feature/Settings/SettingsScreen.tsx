import React from 'react';

import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {ThemeSettings} from './ThemeSettings';

export const SettingsScreen = () => {
  return (
    <ScreenRollupWrapper>
      <Text variant="headlineLarge">Settings</Text>
      <ThemeSettings />
    </ScreenRollupWrapper>
  );
};
