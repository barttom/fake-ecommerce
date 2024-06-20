import React from 'react';
import {screen} from '@testing-library/react-native';
import {InternetConnectionBanner} from '../useInternetConnection/InternetConnectionBanner';
import {renderWithProviders} from '../testHelpers';

const onInfoPressMocked = jest.fn();

describe('<ImageSlider />', () => {
  it('Renders properly', () => {
    renderWithProviders(
      <InternetConnectionBanner onInfoPress={onInfoPressMocked} />,
    );

    expect(screen.getByText('Internet disconnected')).toBeOnTheScreen();
  });
});
