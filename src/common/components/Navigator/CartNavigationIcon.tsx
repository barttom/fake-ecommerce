import React from 'react';
import {StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useAppSelector} from '../../redux';
import {selectCartItems} from '../../../feature/Cart';

export type CartNavigationIconProps = {color: string};

export const CartNavigationIcon = ({color}: CartNavigationIconProps) => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <>
      {!!cartItems.length && (
        <Badge style={styles.badge}>{cartItems.length}</Badge>
      )}
      <MaterialIcons name="shopping-basket" color={color} size={24} />
    </>
  );
};

const styles = StyleSheet.create({
  badge: {position: 'absolute', top: -8, right: -12},
});
