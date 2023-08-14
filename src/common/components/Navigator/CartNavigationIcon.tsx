import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-paper';

import {useAppSelector} from '../../redux';
import {CartSlice} from '../../../feature/Cart';

export type CartNavigationIconProps = {color: string};

export const CartNavigationIcon = ({color}: CartNavigationIconProps) => {
  const cartItems = useAppSelector<CartSlice['items']>(
    state => state.cartReducer.items,
  );

  return (
    <>
      {!!cartItems.length && (
        <Badge style={{position: 'absolute', top: -8, right: -12}}>
          {cartItems.length}
        </Badge>
      )}
      <MaterialIcons name="shopping-basket" color={color} size={24} />
    </>
  );
};
