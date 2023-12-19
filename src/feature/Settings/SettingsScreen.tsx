import React, {useEffect, useState} from 'react';

import {Snackbar, Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {AuthForm, AuthFormValues} from '../Auth/AuthForm';
import {useAuthenticateUserMutation} from '../../common/api';
import {useAppSelector} from '../../common/redux';
import {selectIsAuthenticated, selectUser} from '../Auth/authSelector';
import {UserBanner} from '../Auth/UserBanner';
import {UserMenu} from '../Auth/UserMenu';

const SettingsContent = () => {
  const [sendAuthCredentials, {error, isError}] = useAuthenticateUserMutation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const handleSubmit = (values: AuthFormValues) => sendAuthCredentials(values);
  const [displayError, setDisplayError] = useState(false);
  const errorMessage = `Server error: ${
    (error as {data: {message: string}})?.data?.message
  }`;

  useEffect(() => {
    setDisplayError(isError);
  }, [isError]);

  return (
    <>
      <Text variant="headlineLarge">Settings</Text>
      {!isAuthenticated ? (
        <AuthForm onSubmit={handleSubmit} />
      ) : (
        <UserBanner data={user} />
      )}
      <UserMenu isAuthenticated={isAuthenticated} />
      <Snackbar
        visible={displayError}
        onDismiss={() => setDisplayError(false)}
        duration={3000}>
        {errorMessage}
      </Snackbar>
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
