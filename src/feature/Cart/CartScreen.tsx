import React from 'react';
import {FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppSelector} from '../../common/redux';
import {CartScreenProps} from '../../common/components/Navigator';
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
  const {navigate} = useNavigation<CartScreenProps['navigation']>();
  const handleCheckout = () => navigate('Checkout');

  return (
    <ScreenRollupWrapper>
      <Text variant="headlineSmall">Your cart</Text>
      <CartList />
      <Button mode="contained" onPress={handleCheckout}>
        Checkout
      </Button>
    </ScreenRollupWrapper>
  );
};
