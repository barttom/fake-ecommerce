import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../common/api/apiTypes';
import {getCacheItem, setCacheItem} from '../../common/cache';

export type CartItem = Pick<
  Product,
  'id' | 'thumbnail' | 'stock' | 'title' | 'price'
> & {
  quantity: number;
};
export type CartState = {
  items: Array<CartItem>;
};

const initialCartState: CartState = {
  items: [],
};
const cachedCart = getCacheItem('cart');

const cartSlice = createSlice({
  name: 'cart',
  initialState: cachedCart || initialCartState,
  reducers: {
    addOrEditCartItem: (
      state: CartState,
      {payload}: PayloadAction<CartItem>,
    ) => {
      const existedItemIndex = state.items.findIndex(
        ({id}) => id === payload.id,
      );

      if (existedItemIndex > -1) {
        state.items[existedItemIndex] = payload;
      } else {
        state.items = [...state.items, payload];
      }

      setCacheItem('cart', state);
    },
    removeItemFromCart: (
      state: CartState,
      {payload}: PayloadAction<CartItem['id']>,
    ) => {
      state.items = state.items.filter(item => item.id !== payload);
      setCacheItem('cart', state);
    },
    clearCart: state => {
      state.items = [];
      setCacheItem('cart', state);
    },
  },
});

export const {
  actions: {addOrEditCartItem, removeItemFromCart, clearCart},
  reducer: cartReducer,
} = cartSlice;
