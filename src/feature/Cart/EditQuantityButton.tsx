import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {QuantityInput} from '../../common/components/QuantityInput';
import {useAppDispatch} from '../../common/redux';
import {addOrEditCartItem, CartItem, removeItemFromCart} from './cartSlice';

export type EditQuantityButtonProps = {cartItem: CartItem};

export const EditQuantityButton = ({cartItem}: EditQuantityButtonProps) => {
  const {quantity, stock, id, title} = cartItem;
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    dispatch(
      addOrEditCartItem({
        ...cartItem,
        quantity: quantity - 1,
      }),
    );
  };
  const handleIncrease = () => {
    dispatch(
      addOrEditCartItem({
        ...cartItem,
        quantity: quantity + 1,
      }),
    );
  };
  const handleRemove = () => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <View style={styles.inline}>
      <QuantityInput
        value={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        maxValue={stock - quantity}
        minValue={1}
      />
      <IconButton
        icon="trash-can-outline"
        mode="contained"
        onPress={handleRemove}
        accessibilityLabel={`Remove ${title} from the cart`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
