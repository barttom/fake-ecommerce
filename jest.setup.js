// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-native/extend-expect';
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockStripe from '@stripe/stripe-react-native/jest/mock.js';
import {mswServer} from './src/common/api/msw-mocks/server';
import {setupStore} from './src/common/redux';
import {rootApi} from './src/common/api';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock for stripe
jest.mock('@stripe/stripe-react-native', () => mockStripe);

jest.useFakeTimers();

const store = setupStore();

beforeAll(() => mswServer.listen());

afterEach(() => {
  mswServer.resetHandlers();
  store.dispatch(rootApi.util.resetApiState());
});

afterAll(() => mswServer.close());
