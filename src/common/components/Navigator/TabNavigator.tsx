import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {ProductsScreen} from '../../../feature/Products/';
import {CartScreen} from '../../../feature/Cart/';
import {SettingsScreen} from '../../../feature/Settings/';
import {TabStackParamList} from './navigatorTypes';

const TabStack = createMaterialBottomTabNavigator<TabStackParamList>();

export const TabNavigator = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen name="Products" component={ProductsScreen} />
      <TabStack.Screen name="Cart" component={CartScreen} />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
    </TabStack.Navigator>
  );
};
