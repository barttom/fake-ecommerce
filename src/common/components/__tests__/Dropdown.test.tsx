import React, {useState} from 'react';
import {screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import {renderWithProviders, rntlUser} from '../../utils/testHelpers';
import {Dropdown} from '../Dropdown';

const optionsMocked = [
  {label: 'Batman', value: 'money'},
  {label: 'Superman', value: 'fly'},
];
const onSelectMocked = jest.fn();

describe('<Dropdown />', () => {
  it('renders properly', () => {
    renderWithProviders(
      <Dropdown
        options={optionsMocked}
        onSelect={onSelectMocked}
        placeholder="Choose Your hero"
      />,
    );

    expect(screen.getByText('Choose Your hero')).toBeOnTheScreen();
  });

  it('Renders optional label and display initial option properly', () => {
    renderWithProviders(
      <Dropdown
        options={optionsMocked}
        onSelect={onSelectMocked}
        initialChosenOption={optionsMocked[0]}
        label="Hero"
      />,
    );

    expect(screen.getByText('Hero')).toBeOnTheScreen();
    expect(screen.getByText('Batman')).toBeOnTheScreen();
  });

  describe('Testing with mocked functions, NOT RECOMMENDED 👎', () => {
    it('User is able to choose an option', async () => {
      renderWithProviders(
        <Dropdown
          options={optionsMocked}
          onSelect={onSelectMocked}
          placeholder="Choose Your hero"
        />,
      );

      await rntlUser.press(screen.getByText('Choose Your hero'));
      await rntlUser.press(screen.getByText('Batman'));

      expect(onSelectMocked).toBeCalledWith(optionsMocked[0].value);
    });
  });
  describe('Testing with usage example, RECOMMENDED 👍', () => {
    const DropdownWrapper = () => {
      const [value, setValue] = useState('empty');

      return (
        <>
          <Text>{value}</Text>
          <Dropdown
            options={optionsMocked}
            onSelect={newValue => setValue(newValue as string)}
            placeholder="Choose Your hero"
          />
        </>
      );
    };

    it('User is able to choose an option', async () => {
      renderWithProviders(<DropdownWrapper />);

      expect(screen.getByText('empty')).toBeOnTheScreen();

      await rntlUser.press(screen.getByText('Choose Your hero'));
      await rntlUser.press(screen.getByText('Batman'));

      expect(screen.getByText(optionsMocked[0].value)).toBeOnTheScreen();
    });
  });
});
