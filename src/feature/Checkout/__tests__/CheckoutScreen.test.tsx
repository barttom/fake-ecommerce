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
        cartReducer: {
          items: mockedItems,
        },
      },
    });

    expect(screen.getByText('Order')).toBeOnTheScreen();
  });

  it('User should see validation messages after sending empty form', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {
        cartReducer: {
          items: mockedItems,
        },
      },
    });

    await act(async () => {
      await rntlUser.press(screen.getByText('Order'));
    });

    expect(
      screen.getByText(
        'Your name should have at least 2 and maximum 100 characters',
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Your address should have at least 20 and maximum 500 characters',
      ),
    ).toBeOnTheScreen();
  });

  it('User is able to finish checkout process', async () => {
    renderWithProviders(<Wrapper />, {
      preloadedState: {
        cartReducer: {
          items: mockedItems,
        },
      },
    });

    await act(async () => {
      await rntlUser.type(
        screen.getByLabelText('Name input field'),
        'Clark Kent',
      );
      await rntlUser.type(
        screen.getByLabelText('Address input field'),
        'Apartment 3D 344 Clinton Street, Metropolis, USA',
      );
      await rntlUser.press(screen.getByText('Post'));
      await rntlUser.press(screen.getByText('Courier'));
      await rntlUser.press(screen.getByText('Order'));
    });

    expect(screen.getByText('Your order has been finished')).toBeOnTheScreen();
  });
});
