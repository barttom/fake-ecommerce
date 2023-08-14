import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../common/api/apiTypes';

type CartItem = {id: Product['id']; quantity: number};
export type CartSlice = {
  items: Array<CartItem>;
};

const initialCartState: CartSlice = {
  items: [],
};

const authSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItemToCart: (state, {payload}: PayloadAction<CartItem>) => {
      state.items = [...state.items, payload];
    },
    removeItemFromCart: (state, {payload}: PayloadAction<CartItem['id']>) => {
      state.items = state.items.filter(item => item.id !== payload);
    },
  },
});

export const {
  actions: {addItemToCart, removeItemFromCart},
  reducer: cartReducer,
} = authSlice;
