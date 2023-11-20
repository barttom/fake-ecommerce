import React from 'react';

import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {AuthForm} from '../Auth/AuthForm';
import {useAuthenticateUserMutation} from '../../common/api';
import {ThemeSettings} from './ThemeSettings';

export const SettingsScreen = () => {
  const [sendAuthCredentials, {data}] = useAuthenticateUserMutation();
  console.log('result', data);

  return (
    <ScreenRollupWrapper>
      <Text variant="headlineLarge">Settings</Text>
      <AuthForm onSubmit={values => sendAuthCredentials(values)} />
      <ThemeSettings />
    </ScreenRollupWrapper>
  );
};
