import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../../../feature/Settings';
import {OrdersScreen} from '../../../feature/Orders/OrdersScreen';
import {SettingsStackParamList} from './navigatorTypes';

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BasicSettings" component={SettingsScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};
