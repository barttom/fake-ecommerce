import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SingleProductScreen} from '../../../feature/SingleProduct';
import {CheckoutScreen} from '../../../feature/Checkout';
import {TabNavigator} from './TabNavigator';
import {RootStackParamList} from './index';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProductScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerTitle: 'Checkout',
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
