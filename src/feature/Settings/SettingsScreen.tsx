import React from 'react';

import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {ThemeSettings} from './ThemeSettings';
import {AuthForm} from './AuthForm';

export const SettingsScreen = () => {
  return (
    <ScreenRollupWrapper>
      <Text variant="headlineLarge">Settings</Text>
      <ThemeSettings />
      <AuthForm onSubmit={values => console.log(values)} />
    </ScreenRollupWrapper>
  );
};
