import {AppState} from '../../common/redux';
import {CartItem} from './cartSlice';

export const selectCartItems = (state: AppState): CartItem[] =>
  state.cart.items;
