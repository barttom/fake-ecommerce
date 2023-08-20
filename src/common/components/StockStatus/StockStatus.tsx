import React from 'react';
import {Avatar, ProgressBar, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export type StockStatusProps = {quantity: number};

const getPercentageByValue = (
  quantity: number,
): {label: string; progress: number; color: string} => {
  if (quantity === 0) {
    return {label: 'No items', progress: 0.1, color: 'rgb(186, 26, 26)'};
  }
  if (quantity < 16) {
    return {
      label: 'Last items',
      progress: 0.3,
      color: 'rgb(250, 188, 73)',
    };
  }

  if (quantity > 15 && quantity < 50) {
    return {
      label: 'Enough items',
      progress: 0.6,
      color: 'rgb(0, 83, 29)',
    };
  }

  return {
    label: 'A lot of',
    progress: 0.99,
    color: 'rgb(0, 57, 17)',
  };
};

export const StockStatus = ({quantity}: StockStatusProps) => {
  const {progress, color, label} = getPercentageByValue(quantity);

  return (
    <View>
      <Avatar.Icon
        size={24}
        icon="archive-outline"
        style={[styles.icon, {backgroundColor: color}]}
      />
      <ProgressBar style={styles.progress} progress={progress} color={color} />
      <Text style={styles.label} variant="labelSmall">
        {label}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  progress: {
    width: 110,
    height: 5,
    marginLeft: 10,
  },
  icon: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
  },
  label: {
    alignSelf: 'flex-end',
  },
});
