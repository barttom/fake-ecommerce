import {AppState} from '../../common/redux';

export const selectCartItems = (state: AppState) => state.cart.items;
