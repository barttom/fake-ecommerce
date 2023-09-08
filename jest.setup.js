// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-native/extend-expect';
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

import {mswServer} from './src/common/api/msw-mocks/server';
import {setupStore} from './src/common/redux';
import {rootApi} from './src/common/api';

jest.useFakeTimers();

const store = setupStore();

beforeAll(() => mswServer.listen());

afterEach(() => {
  mswServer.resetHandlers();
  store.dispatch(rootApi.util.resetApiState());
});

afterAll(() => mswServer.close());
