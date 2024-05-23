import React from 'react';
import {FlatList} from 'react-native';
import {List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../common/redux';
import {OrdersScreenProps} from '../../common/components/Navigator';
import {NoDataPlaceholder} from '../../common/components/NoDataPlaceholder';
import {selectOrderItems} from './ordersSelector';

export const OrdersScreen = () => {
  const orderItems = useAppSelector(selectOrderItems);
  const {navigate} = useNavigation<OrdersScreenProps['navigation']>();

  if (orderItems.length === 0) {
    return <NoDataPlaceholder message="No orders." />;
  }

  return (
    <FlatList
      data={orderItems}
      renderItem={({item}) => (
        <List.Item
          title={`#${item.id} - ${item.date}`}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigate('SingleOrder', {orderId: item.id})}
        />
      )}
    />
  );
};
