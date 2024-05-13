import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CartItem} from '../Cart';

export type OrderItemProps = {data: CartItem; order: number};

export const OrderItem = ({data, order}: OrderItemProps) => {
  const {title, price, quantity} = data;

  return (
    <View
      style={[styles.inline, styles.container]}
      accessibilityLabel={`Order item: ${title}`}>
      <View style={styles.row}>
        <Text variant="titleMedium">
          {`${order + 1}. ${title} | ${quantity} x ${price} = $${
            price * quantity
          }`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
