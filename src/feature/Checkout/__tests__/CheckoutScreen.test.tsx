import React from 'react';
import {act, screen} from '@testing-library/react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {renderWithProviders, rntlUser} from '../../../common/utils/testHelpers';
import {CheckoutScreen} from '../CheckoutScreen';

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
const Wrapper = () => (
  <Stack.Navigator>
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

describe('<CheckoutScreen />', () => {
  it('Renders properly', () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {
        cart: {
          items: mockedItems,
        },
      },
    });

    expect(screen.getByText('Order')).toBeOnTheScreen();
  });

  it('User should see validation messages after sending empty form', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {
        cart: {
          items: mockedItems,
        },
      },
    });

    await act(async () => {
      await rntlUser.press(screen.getByText('Order'));
    });

    [
      'Your name should have at least 2 and maximum 100 characters',
      'Your last name should have at least 2 and maximum 100 characters',
      'You need to add a valid email address',
      'Your street should have at least 5 and maximum 100 characters',
      'Postcode must be in format 00-000',
      'Your city should have at least 3 and maximum 50 characters',
      'Add valid phone number',
    ].forEach(message => {
      expect(screen.getByText(message)).toBeOnTheScreen();
    });
  });

  it('User is able to finish checkout process', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {
        cart: {
          items: mockedItems,
        },
      },
    });

    await act(async () => {
      await rntlUser.type(
        screen.getByLabelText('First name input field'),
        'Clark',
      );
      await rntlUser.type(
        screen.getByLabelText('Last name input field'),
        'Kent',
      );
      await rntlUser.type(
        screen.getByLabelText('Email input field'),
        'clark.kent@nohero.com',
      );
      await rntlUser.type(
        screen.getByLabelText('Street input field'),
        'Kryptonite 1/10',
      );
      await rntlUser.type(
        screen.getByLabelText('Postcode input field'),
        '11-100',
      );
      await rntlUser.type(
        screen.getByLabelText('City input field'),
        'Metropolis',
      );
      await rntlUser.type(
        screen.getByLabelText('Phone number input field'),
        '605152123',
      );
      await rntlUser.press(screen.getByText('Post'));
      await rntlUser.press(screen.getByText('Courier'));
      await rntlUser.press(screen.getByText('Order'));
    });

    expect(screen.getByText('Payment')).toBeOnTheScreen();
  });
});
