import React from 'react';
import {screen} from '@testing-library/react-native';

import {renderWithProviders} from '../testHelpers';
import {InternetConnectionSnackbar} from '../useInternetConnection/InternetConnectionSnackbar';

describe('<ImageSlider />', () => {
  it('Renders properly', () => {
    renderWithProviders(
      <InternetConnectionSnackbar visible onDismiss={() => {}} />,
    );

    expect(
      screen.getByText('Internet connection is no available now', {
        exact: false,
      }),
    ).toBeOnTheScreen();
  });
});
