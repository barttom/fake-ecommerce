import React from 'react';

import {Text} from 'react-native-paper';

import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';

import {CartList} from './CartList';

export const CartScreen = () => {
  return (
    <ScreenRollupWrapper>
      <Text variant="headlineSmall">Your cart</Text>
      <CartList />
    </ScreenRollupWrapper>
  );
};
