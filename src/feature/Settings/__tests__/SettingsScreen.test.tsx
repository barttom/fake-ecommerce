import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithProviders, rntlUser} from '../../../common/utils/testHelpers';
import {SettingsScreen} from '../SettingsScreen';
import {authenticatedUserMocked} from '../../../common/api/msw-mocks/productsHandlers';

describe('<SettingsScreen />', () => {
  it('Renders properly default state with visible login form', () => {
    renderWithProviders(<SettingsScreen />, {
      preloadedState: {
        auth: {isAuthenticated: false, user: undefined, me: undefined},
      },
    });

    expect(screen.getByText('Sign in')).toBeOnTheScreen();
    expect(screen.getByLabelText('Username input field')).toBeOnTheScreen();
    expect(screen.getByLabelText('Password input field')).toBeOnTheScreen();
  });

  it('validation errors shows after sending an empty form', async () => {
    renderWithProviders(<SettingsScreen />, {
      preloadedState: {
        auth: {isAuthenticated: false, user: undefined, me: undefined},
      },
    });

    await rntlUser.press(screen.getByText('Log in'));

    expect(screen.getByText('username is a required field')).toBeOnTheScreen();
    expect(screen.getByText('password is a required field')).toBeOnTheScreen();
  });

  it('user is able to display password', async () => {
    renderWithProviders(<SettingsScreen />, {
      preloadedState: {
        auth: {isAuthenticated: false, user: undefined, me: undefined},
      },
    });

    await rntlUser.type(
      screen.getByLabelText('Password input field'),
      'passw0rd',
    );

    await rntlUser.press(screen.getByLabelText('Show password button'));
    expect(screen.getByLabelText('Hide password button')).toBeOnTheScreen();
  });

  it('user is able to login', async () => {
    renderWithProviders(<SettingsScreen />, {
      preloadedState: {
        auth: {isAuthenticated: false, user: undefined, me: undefined},
      },
    });

    await rntlUser.type(
      screen.getByLabelText('Username input field'),
      'emilys',
    );
    await rntlUser.type(
      screen.getByLabelText('Password input field'),
      'emilyspass',
    );
    await rntlUser.press(screen.getByText('Log in'));

    expect(
      await screen.findByText(`Howdy ${authenticatedUserMocked.firstName}!`),
    ).toBeOnTheScreen();
  });

  it('should display error with wrong data', async () => {
    renderWithProviders(<SettingsScreen />, {
      preloadedState: {
        auth: {isAuthenticated: false, user: undefined, me: undefined},
      },
    });

    await rntlUser.type(screen.getByLabelText('Username input field'), 's');
    await rntlUser.type(screen.getByLabelText('Password input field'), 's');
    await rntlUser.press(screen.getByText('Log in'));

    expect(
      await screen.findByText('Server error: Invalid credentials'),
    ).toBeOnTheScreen();
  });
});
