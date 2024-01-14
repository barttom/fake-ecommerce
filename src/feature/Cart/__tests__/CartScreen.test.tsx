import React from 'react';
import {Text} from 'react-native';
import {act, screen} from '@testing-library/react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {renderWithProviders, rntlUser} from '../../../common/utils/testHelpers';
import {CartScreen} from '../CartScreen';

const mockedItems = [
  {
    id: 3,
    price: 1249,
    stock: 36,
    thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    title: 'Samsung Universe 9',
    quantity: 2,
  },
  {
    id: 7,
    price: 1499,
    stock: 50,
    thumbnail: 'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
    title: 'Samsung Galaxy Book',
    quantity: 1,
  },
];

const Stack = createStackNavigator();
const CheckoutExample = () => <Text>Checkout example</Text>;
const Wrapper = () => (
  <Stack.Navigator>
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutExample} />
  </Stack.Navigator>
);

describe('<CartScreen />', () => {
  it('Renders properly', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {cart: {items: mockedItems}},
    });

    expect(screen.getAllByLabelText('Cart item:', {exact: false})).toHaveLength(
      mockedItems.length,
    );
  });

  it('Renders empty state', () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {cart: {items: []}},
    });

    expect(screen.getByText('Your cart is empty')).toBeOnTheScreen();
  });

  it('User is able to remove item from the cart', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {cart: {items: mockedItems}},
    });

    await act(async () => {
      await rntlUser.press(
        screen.getByLabelText('Remove Samsung Galaxy Book from the cart'),
      );
    });

    expect(screen.getAllByLabelText('Cart item:', {exact: false})).toHaveLength(
      mockedItems.length - 1,
    );
  });

  it('User is able to decrease quantity of product', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {cart: {items: mockedItems}},
    });

    const valueElement = screen.getAllByLabelText('Quantity value')[0];

    expect(valueElement).toHaveAccessibilityValue({
      min: 1,
      max: mockedItems[0].stock - mockedItems[0].quantity,
      now: mockedItems[0].quantity,
    });

    await act(async () => {
      await rntlUser.press(
        screen.getAllByLabelText('Decrease quantity button')[0],
      );
    });

    expect(valueElement).toHaveAccessibilityValue({
      min: 1,
      max: mockedItems[0].stock - mockedItems[0].quantity + 1,
      now: mockedItems[0].quantity - 1,
    });
  });

  it('User is able to increase quantity of product', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {cart: {items: mockedItems}},
    });

    const valueElement = screen.getAllByLabelText('Quantity value')[0];

    expect(valueElement).toHaveAccessibilityValue({
      min: 1,
      max: mockedItems[0].stock - mockedItems[0].quantity,
      now: mockedItems[0].quantity,
    });

    await act(async () => {
      await rntlUser.press(
        screen.getAllByLabelText('Increase quantity button')[0],
      );
      await rntlUser.press(
        screen.getAllByLabelText('Increase quantity button')[0],
      );
    });

    expect(valueElement).toHaveAccessibilityValue({
      min: 1,
      max: mockedItems[0].stock - mockedItems[0].quantity - 2,
      now: mockedItems[0].quantity + 2,
    });
  });

  it('User is able to got to the checkout process', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {cart: {items: mockedItems}},
    });

    await act(async () => {
      await rntlUser.press(screen.getByText('Checkout'));
    });

    expect(screen.getByText('Checkout example')).toBeOnTheScreen();
  });
});
