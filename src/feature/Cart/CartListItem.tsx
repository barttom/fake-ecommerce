import React from 'react';
import {Image, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {CartItem} from './cartSlice';
import {CartButton} from './CartButton';

export type CartListItemProps = {data: CartItem};

export const CartListItem = ({data}: CartListItemProps) => {
  const {title, thumbnail} = data;

  return (
    <View>
      <Image source={{uri: thumbnail}} accessibilityIgnoresInvertColors />
      <View>
        <Text>{title}</Text>
        <View>
          <CartButton cartItem={data} />
          <IconButton icon="trash" />
        </View>
      </View>
    </View>
  );
};
