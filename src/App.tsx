import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {initialStore} from './common/redux';
import {Bootstrap} from './common/components/Bootstrap';

// For presentation purposes, to avoid logs to be on the screen when running E2E tests
LogBox.ignoreAllLogs(true);

// @ts-ignore
const stripePK = process.env.STRIPE_PUBLIC_KEY;

function App() {
  return (
    <StripeProvider publishableKey={stripePK}>
      <Provider store={initialStore}>
        <Bootstrap />
      </Provider>
    </StripeProvider>
  );
}

export default App;
