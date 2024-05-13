import React from 'react';
import {Button, Text} from 'react-native-paper';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../common/redux';
import {selectCartItems} from '../Cart';
import {selectDeliveryData} from '../Settings/settingsSelectors';
import {OrderItem} from './OrderIItem';

export type CheckoutPaymentProps = {onFinish: () => void};

export const CheckoutPayment = ({onFinish}: CheckoutPaymentProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  const {email, phone, postalCode, city, address, firstName, lastName} =
    useAppSelector(selectDeliveryData)!;

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineSmall" style={styles.headline}>
        Order items:
      </Text>
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => <OrderItem data={item} order={index} />}
      />
      <Text variant="headlineSmall">Delivery address:</Text>
      <Text variant="bodyMedium">{`${firstName} ${lastName}`}</Text>
      <Text variant="bodyMedium">{`${address} ${postalCode}, ${city}`}</Text>
      <Text variant="bodyMedium">{phone}</Text>
      <Text variant="bodyMedium">{email}</Text>
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
    marginVertical: 16,
  },
});
