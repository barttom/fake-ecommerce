import React, {useState} from 'react';
import {Button, Menu, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export type DropdownOption = {
  label: string;
  value: string | number;
};
export type DropdownProps = {
  placeholder?: string;
  options: Array<DropdownOption>;
  onSelect: (chosenOption: DropdownOption['value']) => void;
  label?: string;
  initialChosenOption?: DropdownOption;
};

export const Dropdown = ({
  options,
  onSelect,
  placeholder,
  label,
  initialChosenOption,
}: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chosenOption, setChosenOption] = useState<DropdownOption | null>(
    initialChosenOption || null,
  );
  const handleCloseMenu = () => setIsVisible(false);
  const handleOpenMenu = () => setIsVisible(true);
  const handleChooseItem = (option: DropdownOption) => {
    onSelect(option.value);
    setChosenOption(option);
    handleCloseMenu();
  };
  //
  // useEffect(() => {
  //   if (chosenOption === null && options.length) {
  //     setChosenOption(options[0]);
  //   }
  // }, [chosenOption, options]);

  return (
    <>
      {label && (
        <Text
          accessibilityLabel={label}
          variant="labelMedium"
          style={styles.label}>
          {label}
        </Text>
      )}
      <Menu
        visible={isVisible}
        onDismiss={handleCloseMenu}
        anchor={
          <Button
            accessibilityLabel={chosenOption?.label}
            onPress={handleOpenMenu}
            mode="outlined"
            icon="menu-down"
            contentStyle={styles.trigger}>
            {chosenOption?.label || placeholder}
          </Button>
        }>
        {options.map(({label: optionLabel, value}) => (
          <Menu.Item
            key={value}
            title={optionLabel}
            onPress={() => handleChooseItem({label: optionLabel, value})}
          />
        ))}
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row-reverse',
  },
  label: {marginBottom: 4},
});
