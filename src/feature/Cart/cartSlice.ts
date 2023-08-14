import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../common/api/apiTypes';

type CartItem = {productId: Product['id']; quantity: number};
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
      const existedItemIndex = state.items.findIndex(
        ({productId}) => productId === payload.productId,
      );
      if (existedItemIndex > -1) {
        state.items[existedItemIndex] = payload;
      } else {
        state.items = [...state.items, payload];
      }
    },
    removeItemFromCart: (
      state,
      {payload}: PayloadAction<CartItem['productId']>,
    ) => {
      state.items = state.items.filter(item => item.productId !== payload);
    },
  },
});

export const {
  actions: {addItemToCart, removeItemFromCart},
  reducer: cartReducer,
} = authSlice;
