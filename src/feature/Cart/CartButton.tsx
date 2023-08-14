import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';

import {Product} from '../../common/api/apiTypes';
import {useAppDispatch} from '../../common/redux';
import {addItemToCart} from './cartSlice';

export type CartButtonProps = {maxQuantity: number; productId: Product['id']};

export const CartButton = ({maxQuantity, productId}: CartButtonProps) => {
  const [quantity, setQuantity] = useState(maxQuantity > 0 ? 1 : 0);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        productId,
        quantity,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.quantityContainer]}>
        <IconButton
          icon="minus"
          onPress={handleDecrease}
          mode="contained"
          disabled={quantity === 0}
        />
        <Text
          variant="titleMedium"
          style={[
            styles.quantity,
            {backgroundColor: colors.surface, color: colors.onSurface},
          ]}>
          {quantity}
        </Text>
        <IconButton
          icon="plus"
          onPress={handleIncrease}
          mode="contained"
          disabled={quantity === maxQuantity}
        />
      </View>
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
