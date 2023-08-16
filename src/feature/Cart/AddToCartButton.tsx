import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../../common/redux';
import {QuantityInput} from '../../common/components/QuantityInput';
import {addItemToCart, CartItem} from './cartSlice';
import {selectCartItems} from './cartSelectors';

export type AddToCartButtonProps = {
  cartItem: Omit<CartItem, 'quantity'>;
};

export const AddToCartButton = ({cartItem}: AddToCartButtonProps) => {
  const {stock} = cartItem;
  const cartItems = useAppSelector(selectCartItems);
  const existedQuantity =
    cartItems.find(({id}) => id === cartItem.id)?.quantity || 0;

  const maxQuantity = stock - existedQuantity;
  const initialQuantity = maxQuantity > 0 ? 1 : 0;
  const [quantity, setQuantity] = useState(initialQuantity);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...cartItem,
        quantity: quantity + existedQuantity,
      }),
    );

    setQuantity(initialQuantity);
  };

  return (
    <View style={styles.container}>
      <QuantityInput
        value={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        maxValue={maxQuantity}
      />
      <IconButton
        icon="cart-plus"
        mode="contained"
        disabled={quantity === 0}
        containerColor={colors.primary}
        iconColor={colors.onPrimary}
        onPress={handleAddToCart}
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
});
