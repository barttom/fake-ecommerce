import {NativeStackScreenProps} from 'react-native-screens/native-stack';

export type RootStackParamList = {
  Home: undefined;
  SingleProduct: {
    productId: number;
  };
};
export type HomeScreenParams = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type SingleProductScreenParams = NativeStackScreenProps<
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
export type CartScreenProps = NativeStackScreenProps<TabStackParamList, 'Cart'>;
export type SettingsScreenProps = NativeStackScreenProps<
  TabStackParamList,
  'Settings'
>;
