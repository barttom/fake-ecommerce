import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {initialStore} from './common/redux';
import {Bootstrap} from './common/components/Bootstrap';

// For presentation purposes, to avoid logs to be on the screen when running E2E tests
LogBox.ignoreAllLogs(true);

function App() {
  return (
    <Provider store={initialStore}>
      <Bootstrap />
    </Provider>
  );
}

export default App;
