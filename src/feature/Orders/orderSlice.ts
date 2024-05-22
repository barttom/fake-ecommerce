import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCacheItem, setCacheItem} from '../../common/cache';
import {CartItem} from '../Cart';
import {SettingsState} from '../Settings';

export type OrderItem = {
  items: CartItem[];
  deliveryData: SettingsState['deliveryData'];
  date: string;
  id: string;
  status: 'preparing' | 'delivering' | 'finished';
};
export type OrderState = {
  items: Array<OrderItem>;
};

const initialCartState: OrderState = {
  items: [],
};
const cachedOrders = getCacheItem('orders');

const orderSlice = createSlice({
  name: 'cart',
  initialState: cachedOrders || initialCartState,
  reducers: {
    addOrderItem: (
      state: OrderState,
      {payload}: PayloadAction<Omit<OrderItem, 'id' | 'date' | 'status'>>,
    ) => {
      state.items.push({
        ...payload,
        id:
          new Date().getTime() + (Math.random() + 1).toString(36).substring(7),
        date: new Date().toLocaleDateString(),
        status: 'preparing',
      });

      setCacheItem('orders', state);
    },
  },
});

export const {
  reducer: ordersReducer,
  actions: {addOrderItem},
} = orderSlice;
