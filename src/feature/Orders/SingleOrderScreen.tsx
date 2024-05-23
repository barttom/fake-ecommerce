import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '../../common/redux';
import {CheckoutOrderItem} from '../Checkout/CheckoutOrderIItem';
import {SingleOrderScreenProps} from '../../common/components/Navigator';
import {NoDataPlaceholder} from '../../common/components/NoDataPlaceholder';
import {selectOrder} from './ordersSelector';

export const SingleOrderScreen = () => {
  const {params} = useRoute<SingleOrderScreenProps['route']>();
  const order = useAppSelector(selectOrder(params.orderId));

  if (!order) {
    return (
      <View style={styles.wrapper}>
        <NoDataPlaceholder message="Order doesn't exist" />
      </View>
    );
  }

  const cartItems = order.items;
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  const {email, phone, postalCode, city, address, firstName, lastName} =
    order.deliveryData!;

  return (
    <View style={styles.wrapper}>
      <Text variant="headlineSmall" style={styles.headline}>
        Ordered items:
      </Text>
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => (
          <CheckoutOrderItem data={item} order={index} />
        )}
      />
      <Text variant="headlineSmall">Delivery address:</Text>
      <Text variant="bodyMedium">{`${firstName} ${lastName}`}</Text>
      <Text variant="bodyMedium">{`${address} ${postalCode}, ${city}`}</Text>
      <Text variant="bodyMedium">{phone}</Text>
      <Text variant="bodyMedium">{email}</Text>
      <Text variant="headlineSmall" style={styles.headline}>
        Total price: ${totalPrice}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headline: {
    marginVertical: 16,
  },
});
