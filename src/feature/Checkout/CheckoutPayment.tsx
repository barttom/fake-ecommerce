import React from 'react';
import {Button, Text} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../common/redux';
import {selectCartItems} from '../Cart';
import {OrderItem} from './OrderIItem';

export type CheckoutPaymentProps = {onFinish: () => void};

export const CheckoutPayment = ({onFinish}: CheckoutPaymentProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineSmall" style={styles.headline}>
        Order items:
      </Text>
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => <OrderItem data={item} order={index} />}
      />
      <Text variant="headlineSmall" style={styles.headline}>
        Total price: ${totalPrice}
      </Text>
      <Button mode="contained" onPress={onFinish}>
        Payment
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headline: {
    marginBottom: 16,
  },
});
