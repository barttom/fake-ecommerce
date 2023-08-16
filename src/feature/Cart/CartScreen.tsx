import React from 'react';
import {FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppSelector} from '../../common/redux';
import {selectCartItems} from './cartSelectors';
import {CartListItem} from './CartListItem';

const CartList = () => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <FlatList
      data={cartItems}
      renderItem={({item}) => <CartListItem data={item} />}
      keyExtractor={({id}) => id.toString()}
    />
  );
};

export const CartScreen = () => {
  return (
    <ScreenRollupWrapper>
      <Text variant="headlineSmall">Your cart</Text>
      <CartList />
      <Button mode="contained">Checkout</Button>
    </ScreenRollupWrapper>
  );
};
