import React from 'react';

import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {AuthForm} from '../Auth/AuthForm';

import {useAppSelector} from '../../common/redux';
import {selectIsAuthenticated, selectUser} from '../Auth/authSelector';
import {UserBanner} from '../Auth/UserBanner';
import {UserMenu} from '../Auth/UserMenu';

const SettingsContent = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  return (
    <>
      <Text variant="headlineLarge">Settings</Text>
      {!isAuthenticated ? <AuthForm /> : <UserBanner data={user} />}
      <UserMenu isAuthenticated={isAuthenticated} />
    </>
  );
};

export const SettingsScreen = () => {
  return (
    <ScreenRollupWrapper>
      <SettingsContent />
    </ScreenRollupWrapper>
  );
};
