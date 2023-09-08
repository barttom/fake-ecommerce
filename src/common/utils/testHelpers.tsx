import React, {PropsWithChildren} from 'react';

import type {PreloadedState, Store} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import {render, userEvent} from '@testing-library/react-native';
import {PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {AppState, AppStore, initialStore, setupStore} from '../redux';

interface ExtendedRenderOptions {
  preloadedState?: PreloadedState<AppState> | object;
  store?: AppStore;
}

const Wrapper = ({
  children,
  store = initialStore,
}: PropsWithChildren<{store: Store}>): JSX.Element => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  return {
    store,
    ...render(<Wrapper store={store}>{ui}</Wrapper>, renderOptions),
  };
}

export const rntlUser = userEvent.setup();
