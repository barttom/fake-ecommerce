import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../utils/testHelpers';
import {ImageSlider} from '../ImageSlider';

describe('<ImageSlider />', () => {
  it('Renders properly', () => {
    renderWithProviders(<ImageSlider images={['first/image']} />);

    expect(
      screen.getByLabelText('Image number: 1 in gallery'),
    ).toBeOnTheScreen();
  });
});
