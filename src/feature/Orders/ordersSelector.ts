import {AppState} from '../../common/redux';

import {OrderItem} from './orderSlice';

export const selectOrderItems = (state: AppState): OrderItem[] =>
  state.orders.items;
