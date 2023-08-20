import React from 'react';
import {FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppSelector} from '../../common/redux';
import {CartScreenProps} from '../../common/components/Navigator';
import {NoDataPlaceholder} from '../../common/components/NoDataPlaceholder';
import {selectCartItems} from './cartSelectors';
import {CartListItem} from './CartListItem';

const CartList = () => {
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

export const CartScreen = () => {
  return (
    <ScreenRollupWrapper>
      <Text variant="headlineSmall">Your cart</Text>
      <CartList />
    </ScreenRollupWrapper>
  );
};
