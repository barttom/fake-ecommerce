import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../../../feature/Settings';
import {OrdersScreen, SingleOrderScreen} from '../../../feature/Orders';
import {SettingsStackParamList} from './navigatorTypes';

const Stack = createStackNavigator<SettingsStackParamList>();

export const SettingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BasicSettings">
      <Stack.Screen
        name="BasicSettings"
        component={SettingsScreen}
        options={{headerShown: false, title: 'Settings'}}
      />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="SingleOrder" component={SingleOrderScreen} />
    </Stack.Navigator>
  );
};
