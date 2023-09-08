import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CartItem} from './cartSlice';
import {EditQuantityButton} from './EditQuantityButton';

export type CartListItemProps = {data: CartItem};

export const CartListItem = ({data}: CartListItemProps) => {
  const {title, thumbnail, price, quantity} = data;

  return (
    <View
      style={[styles.inline, styles.container]}
      accessibilityLabel={`Cart item: ${title}`}>
      <Image
        style={styles.image}
        source={{uri: thumbnail}}
        accessibilityIgnoresInvertColors
        resizeMode="contain"
      />
      <View>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="titleMedium">${price * quantity}</Text>
        <EditQuantityButton cartItem={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 16,
    width: 100,
    height: 80,
  },
});
