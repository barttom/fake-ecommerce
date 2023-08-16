import React from 'react';
import {FlatList} from 'react-native';
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
      <CartList />
    </ScreenRollupWrapper>
  );
};
