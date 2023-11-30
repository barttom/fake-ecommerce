import React from 'react';

import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {AuthForm} from '../Auth/AuthForm';
import {useAuthenticateUserMutation} from '../../common/api';
import {useAppSelector} from '../../common/redux';
import {selectIsAuthenticated} from '../Auth/authSelector';
import {ThemeSettings} from './ThemeSettings';

export const SettingsScreen = () => {
  const [sendAuthCredentials] = useAuthenticateUserMutation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <ScreenRollupWrapper>
      <Text variant="headlineLarge">Settings</Text>
      {!isAuthenticated && (
        <AuthForm onSubmit={values => sendAuthCredentials(values)} />
      )}

      <ThemeSettings />
    </ScreenRollupWrapper>
  );
};
