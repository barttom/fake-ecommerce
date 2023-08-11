import React, {useEffect, useState} from 'react';
import {Button, Menu} from 'react-native-paper';

export type DropdownOption = {
  label: string;
  value: string | number;
};
export type DropdownProps = {
  placeholder?: string;
  options: Array<DropdownOption>;
  onSelect: (chosenOption: DropdownOption['value']) => void;
};

export const Dropdown = ({options, onSelect, placeholder}: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chosenOption, setChosenOption] = useState<DropdownOption | null>(
    options.length ? options[0] : null,
  );
  const handleCloseMenu = () => setIsVisible(false);
  const handleOpenMenu = () => setIsVisible(true);
  const handleChooseItem = (option: DropdownOption) => {
    onSelect(option.value);
    setChosenOption(option);
    handleCloseMenu();
  };

  useEffect(() => {
    if (chosenOption === null && options.length) {
      setChosenOption(options[0]);
    }
  }, [options]);

  return (
    <Menu
      visible={isVisible}
      onDismiss={handleCloseMenu}
      anchor={
        <Button
          onPress={handleOpenMenu}
          mode="contained"
          icon="menu-down"
          contentStyle={{flexDirection: 'row-reverse'}}>
          {chosenOption?.label || placeholder}
        </Button>
      }>
      {options.map(({label, value}) => (
        <Menu.Item
          key={value}
          title={label}
          onPress={() => handleChooseItem({label, value})}
        />
      ))}
    </Menu>
  );
};
