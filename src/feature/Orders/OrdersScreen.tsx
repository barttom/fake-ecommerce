import React from 'react';
import {FlatList} from 'react-native';
import {List} from 'react-native-paper';
import {useAppSelector} from '../../common/redux';
import {selectOrderItems} from './ordersSelector';

export const OrdersScreen = () => {
  const orderItems = useAppSelector(selectOrderItems);

  return (
    <>
      <FlatList
        data={orderItems}
        renderItem={({item}) => (
          <List.Item
            title={`${item.date} #${item.id}`}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
      />
    </>
  );
};
