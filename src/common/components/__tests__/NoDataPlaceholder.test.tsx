import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../utils/testHelpers';
import {NoDataPlaceholder} from '../NoDataPlaceholder';

describe('<NoDataPlaceholder />', () => {
  it('renders properly', () => {
    renderWithProviders(<NoDataPlaceholder message="some text" />);

    expect(screen.getByText('some text')).toBeOnTheScreen();
  });
});
