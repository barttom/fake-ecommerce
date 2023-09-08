import React from 'react';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export type QuantityInputProps = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minValue?: number;
  maxValue?: number;
};

export const QuantityInput = ({
  value,
  onDecrease,
  onIncrease,
  minValue = 0,
  maxValue = 100,
}: QuantityInputProps) => {
  const {colors} = useTheme();

  const handleDecrease = () => {
    if (value > minValue) {
      onDecrease();
    }
  };
  const handleIncrease = () => {
    if (value < maxValue) {
      onIncrease();
    }
  };

  return (
    <View style={[styles.container, styles.quantityContainer]}>
      <IconButton
        icon="minus"
        onPress={handleDecrease}
        mode="contained"
        disabled={value === minValue}
        accessibilityLabel="Decrease quantity button"
      />
      <Text
        variant="titleMedium"
        style={[
          styles.quantity,
          {backgroundColor: colors.surface, color: colors.onSurface},
        ]}
        accessibilityLabel="Quantity value"
        accessibilityValue={{min: minValue, now: value, max: maxValue}}>
        {value}
      </Text>
      <IconButton
        icon="plus"
        onPress={handleIncrease}
        mode="contained"
        disabled={value === maxValue}
        accessibilityLabel="Increase quantity button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    borderRadius: 16,
  },
  quantity: {
    paddingHorizontal: 8,
    textAlign: 'center',
    minWidth: 40,
    height: 40,
    lineHeight: 40,
  },
});
