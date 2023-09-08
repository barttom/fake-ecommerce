import React, {useState} from 'react';
import {screen} from '@testing-library/react-native';
import {renderWithProviders, rntlUser} from '../../utils/testHelpers';
import {QuantityInput} from '../QuantityInput';

describe('<QuantityInput />', function () {
  it('Renders properly', () => {
    renderWithProviders(
      <QuantityInput value={667} onIncrease={() => {}} onDecrease={() => {}} />,
    );

    expect(screen.getByText('667')).toBeOnTheScreen();
  });

  it('Renders properly with snapshot', () => {
    const component = renderWithProviders(
      <QuantityInput value={667} onIncrease={() => {}} onDecrease={() => {}} />,
    );

    expect(component).toMatchSnapshot();
  });

  describe('Testing with mocked functions, NOT RECOMMENDED 👎', () => {
    it('Increase and decrease quantity are called properly', async () => {
      const onIncreaseMocked = jest.fn();
      const onDecreaseMocked = jest.fn();

      renderWithProviders(
        <QuantityInput
          value={10}
          onIncrease={onIncreaseMocked}
          onDecrease={onDecreaseMocked}
        />,
      );

      await rntlUser.press(screen.getByLabelText('Increase quantity button'));
      await rntlUser.press(screen.getByLabelText('Decrease quantity button'));

      expect(onIncreaseMocked).toHaveBeenCalled();
      expect(onDecreaseMocked).toHaveBeenCalled();
    });

    it('Increase and decrease quantity are not called in case when of min & max values', async () => {
      const onIncreaseMocked = jest.fn();
      const onDecreaseMocked = jest.fn();

      renderWithProviders(
        <QuantityInput
          value={10}
          minValue={10}
          maxValue={10}
          onIncrease={onIncreaseMocked}
          onDecrease={onDecreaseMocked}
        />,
      );

      await rntlUser.press(screen.getByLabelText('Increase quantity button'));
      await rntlUser.press(screen.getByLabelText('Decrease quantity button'));

      expect(onIncreaseMocked).not.toHaveBeenCalled();
      expect(onDecreaseMocked).not.toHaveBeenCalled();
    });
  });

  describe('Testing with usage example, RECOMMENDED 👍', () => {
    // Example component with usage of quantity input
    const QuantityInputWrapper = () => {
      const [value, setValue] = useState(0);

      return (
        <QuantityInput
          value={value}
          onIncrease={() => setValue(value + 1)}
          onDecrease={() => setValue(value - 1)}
          minValue={0}
          maxValue={2}
        />
      );
    };

    it('Increase and decrease quantity are called properly', async () => {
      renderWithProviders(<QuantityInputWrapper />);

      // initial state
      expect(screen.getByText('0')).toBeOnTheScreen();

      // Added one quantity and check result
      await rntlUser.press(screen.getByLabelText('Increase quantity button'));
      expect(screen.getByText('1')).toBeOnTheScreen();

      // Subtracted one quantity and check result
      await rntlUser.press(screen.getByLabelText('Decrease quantity button'));
      expect(screen.getByText('0')).toBeOnTheScreen();
    });

    it('Increase and decrease quantity are not called in case when of min & max values', async () => {
      renderWithProviders(<QuantityInputWrapper />);

      const decreaseButton = screen.getByLabelText('Decrease quantity button');
      const increaseButton = screen.getByLabelText('Increase quantity button');

      // initial state
      expect(screen.getByText('0')).toBeOnTheScreen();

      // Subtracted one quantity and check result tah shouldn't be lower than minimal value
      await rntlUser.press(decreaseButton);
      await rntlUser.press(decreaseButton);

      expect(screen.getByText('0')).toBeOnTheScreen();

      // Added one quantity and check result that shouldn't be greater than max value
      await rntlUser.press(increaseButton);
      await rntlUser.press(increaseButton);
      await rntlUser.press(increaseButton);
      expect(screen.getByText('2')).toBeOnTheScreen();
    });
  });
});
