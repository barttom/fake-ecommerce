import React from 'react';

import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {AuthForm} from '../Auth/AuthForm';
import {useAuthenticateUserMutation} from '../../common/api';
import {useAppSelector} from '../../common/redux';
import {selectIsAuthenticated, selectUser} from '../Auth/authSelector';
import {UserBanner} from '../Auth/UserBanner';
import {UserMenu} from '../Auth/UserMenu';

export const SettingsScreen = () => {
  const [sendAuthCredentials] = useAuthenticateUserMutation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  return (
    <ScreenRollupWrapper>
      <Text variant="headlineLarge">Settings</Text>
      {!isAuthenticated ? (
        <AuthForm onSubmit={values => sendAuthCredentials(values)} />
      ) : (
        <UserBanner data={user} />
      )}
      <UserMenu isAuthenticated={isAuthenticated} />
    </ScreenRollupWrapper>
  );
};
