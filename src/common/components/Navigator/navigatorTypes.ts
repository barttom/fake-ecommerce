import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {Product} from '../../api/apiTypes';
import {OrderItem} from '../../../feature/Orders/orderSlice';

export type RootStackParamList = {
  Home: undefined;
  SingleProduct: {
    productId: Product['id'];
  };
  Checkout: undefined;
};
export type HomeScreenParams = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type SingleProductScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SingleProduct'
>;

export type TabStackParamList = {
  Products: undefined;
  Cart: undefined;
  Settings: undefined;
};
export type ProductsScreenProps = NativeStackScreenProps<
  TabStackParamList,
  'Products'
>;
export type CartScreenProps = NativeStackScreenProps<
  TabStackParamList,
  'Cart'
> &
  HomeScreenParams;
export type SettingsScreenProps = NativeStackScreenProps<
  TabStackParamList,
  'Settings'
>;

export type SettingsStackParamList = {
  BasicSettings: undefined;
  Orders: undefined;
  SingleOrder: {orderId: OrderItem['id']};
};

export type BasicSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'BasicSettings'
>;
