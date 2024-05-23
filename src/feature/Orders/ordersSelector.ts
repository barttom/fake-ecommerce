import {AppState} from '../../common/redux';

import {OrderItem} from './orderSlice';

export const selectOrderItems = (state: AppState): OrderItem[] =>
  state.orders.items;

export const selectOrder =
  (chosenId: OrderItem['id']) =>
  (state: AppState): OrderItem | undefined =>
    state.orders.items.find(({id}: OrderItem) => id === chosenId);
