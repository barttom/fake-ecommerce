import React from 'react';
import {Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAppSelector} from '../../common/redux';
import {selectCartItems} from './cartSelectors';

export const CartScreen = () => {
  const cartItems = useAppSelector(selectCartItems);
  console.log(cartItems);
  return (
    <ScreenRollupWrapper>
      <Text>Cart</Text>
    </ScreenRollupWrapper>
  );
};
