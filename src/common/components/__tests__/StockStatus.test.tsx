import React from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../utils/testHelpers';
import {StockStatus} from '../StockStatus';

describe('<StockStatus />', () => {
  it('Renders properly for a lot of amount', () => {
    renderWithProviders(<StockStatus quantity={100} />);

    expect(screen.getByText('A lot of')).toBeOnTheScreen();
  });

  it('Renders properly for no items', () => {
    renderWithProviders(<StockStatus quantity={0} />);

    expect(screen.getByText('No items')).toBeOnTheScreen();
  });

  it('Renders properly for last items', () => {
    renderWithProviders(<StockStatus quantity={5} />);

    expect(screen.getByText('Last items')).toBeOnTheScreen();
  });

  it('Renders properly enough amount', () => {
    renderWithProviders(<StockStatus quantity={40} />);

    expect(screen.getByText('Enough items')).toBeOnTheScreen();
  });
});
