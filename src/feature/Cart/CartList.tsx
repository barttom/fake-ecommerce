import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import {NoDataPlaceholder} from '../../common/components/NoDataPlaceholder';
import {CartScreenProps} from '../../common/components/Navigator';
import {useAppSelector} from '../../common/redux';
import {CartListItem} from './CartListItem';
import {selectCartItems} from './cartSelectors';

export const CartList = () => {
  const cartItems = useAppSelector(selectCartItems);
  const {navigate} = useNavigation<CartScreenProps['navigation']>();
  const handleCheckout = () => navigate('Checkout');

  if (cartItems.length === 0) {
    return <NoDataPlaceholder message="Your cart is empty" />;
  }

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({item}) => <CartListItem data={item} />}
        keyExtractor={({id}) => id.toString()}
      />
      <Button mode="contained" onPress={handleCheckout}>
        Checkout
      </Button>
    </>
  );
};
