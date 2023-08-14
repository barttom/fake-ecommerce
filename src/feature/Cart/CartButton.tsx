import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, FAB, Text, useTheme} from 'react-native-paper';

export type CartButtonProps = {max: number};

export const CartButton = ({max}: CartButtonProps) => {
  const [quantity, setQuantity] = useState(max > 0 ? 1 : 0);
  const {colors} = useTheme();

  const handleIncrease = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {};

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.container,
          styles.quantityContainer,
          {backgroundColor: colors.surface},
        ]}>
        <FAB
          icon="minus"
          onPress={handleDecrease}
          size="small"
          variant="surface"
        />
        <Text style={[styles.quantity]}>{quantity}</Text>
        <FAB
          icon="plus"
          onPress={handleIncrease}
          size="small"
          variant="surface"
        />
      </View>
      <Button icon="cart-plus" mode="contained" onPress={handleAddToCart}>
        Add
      </Button>
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
    marginRight: 8,
  },
  quantity: {
    paddingHorizontal: 8,
    textAlign: 'center',
    minWidth: 40,
  },
});
