import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {ProductsScreen} from '../../../feature/Products/';
import {CartScreen} from '../../../feature/Cart/';
import {SettingsScreen} from '../../../feature/Settings/';
import {TabStackParamList} from './navigatorTypes';

const TabStack = createMaterialBottomTabNavigator<TabStackParamList>();

export const TabNavigator = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="list" color={color} size={24} />
          ),
        }}
      />
      <TabStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="shopping-basket" color={color} size={24} />
          ),
        }}
      />
      <TabStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="settings" color={color} size={24} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};