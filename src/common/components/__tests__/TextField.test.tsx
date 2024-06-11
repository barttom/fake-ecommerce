import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {renderWithProviders} from '../../utils/testHelpers';
import {TextField} from '../TextField';

describe('TextField component', () => {
  it('renders correctly without error', () => {
    renderWithProviders(<TextField label="Username" />);

    const textInput = screen.getByLabelText('Username input field');
    expect(textInput).toBeOnTheScreen();
    expect(screen.queryByText('Username is required')).toBeNull();
  });

  it('renders correctly with error', () => {
    renderWithProviders(
      <TextField label="Username" error="Username is required" />,
    );

    const textInput = screen.getByLabelText('Username input field');
    const errorText = screen.getByText('Username is required');

    expect(textInput).toBeOnTheScreen();
    expect(errorText).toBeOnTheScreen();
  });

  it('calls onChangeText when text is changed', () => {
    const mockOnChangeText = jest.fn();
    renderWithProviders(
      <TextField label="Username" onChangeText={mockOnChangeText} />,
    );

    const textInput = screen.getByLabelText('Username input field');
    fireEvent.changeText(textInput, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });
});
