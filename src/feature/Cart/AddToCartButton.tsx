import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../../common/redux';
import {QuantityInput} from '../../common/components/QuantityInput';
import {addOrEditCartItem, CartItem} from './cartSlice';
import {selectCartItems} from './cartSelectors';

export type AddToCartButtonProps = {
  cartItem: Omit<CartItem, 'quantity'>;
  onAddToCart: () => void;
};

export const AddToCartButton = ({
  cartItem,
  onAddToCart,
}: AddToCartButtonProps) => {
  const {stock} = cartItem;
  const cartItems = useAppSelector(selectCartItems);
  const existedQuantity =
    cartItems.find(({id}) => id === cartItem.id)?.quantity || 0;

  const maxQuantity = stock - existedQuantity;
  const [quantity, setQuantity] = useState(existedQuantity || 1);
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
      addOrEditCartItem({
        ...cartItem,
        quantity,
      }),
    );
    onAddToCart();
  };

  return stock > 0 ? (
    <View style={styles.container}>
      <QuantityInput
        value={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        maxValue={maxQuantity}
        minValue={1}
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
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
