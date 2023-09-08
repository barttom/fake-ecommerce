import React from 'react';
import {screen} from '@testing-library/react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import {renderWithProviders, rntlUser} from '../../../common/utils/testHelpers';
import {SingleProductScreen} from '../SingleProductScreen';
import {productsSmartphonesMocked} from '../../../common/api/msw-mocks/productsHandlers';

const currentProduct = productsSmartphonesMocked[0];

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        productId: 1,
      },
    }),
  };
});

const Stack = createStackNavigator();
const CartExample = () => <Text>Cart example</Text>;
const Wrapper = () => (
  <Stack.Navigator>
    <Stack.Screen name="SingleProduct" component={SingleProductScreen} />
    <Stack.Screen name="Cart" component={CartExample} />
  </Stack.Navigator>
);

describe('<SingleProductScreen />', () => {
  it('Renders properly', async () => {
    renderWithProviders(<Wrapper />, {});

    const description = await screen.findByText(currentProduct.description);

    expect(description).toBeOnTheScreen();
  });

  it('User is able to add item to the cart', async () => {
    renderWithProviders(<Wrapper />, {});

    const addButton = await screen.findByLabelText('Add to cart');

    await rntlUser.press(addButton);

    expect(
      screen.getByText('Your product has been added to cart'),
    ).toBeOnTheScreen();
  });

  it('User is able to increase item quantity', async () => {
    renderWithProviders(<Wrapper />, {});

    const increaseButton = await screen.findByLabelText(
      'Increase quantity button',
    );

    await rntlUser.press(increaseButton);

    expect(screen.getByLabelText('Quantity value')).toHaveAccessibilityValue({
      min: 1,
      max: currentProduct.stock,
      now: 2,
    });
  });

  it('User is able to decrease item quantity', async () => {
    renderWithProviders(<Wrapper />, {});

    const increaseButton = await screen.findByLabelText(
      'Increase quantity button',
    );
    const decreaseButton = await screen.findByLabelText(
      'Decrease quantity button',
    );

    await rntlUser.press(increaseButton);

    expect(screen.getByLabelText('Quantity value')).toHaveAccessibilityValue({
      min: 1,
      max: currentProduct.stock,
      now: 2,
    });

    await rntlUser.press(decreaseButton);

    expect(screen.getByLabelText('Quantity value')).toHaveAccessibilityValue({
      min: 1,
      max: currentProduct.stock,
      now: 1,
    });
  });

  it('User can go to the cart from confirmation message', async () => {
    renderWithProviders(<Wrapper />, {});

    const addToCartButton = await screen.findByLabelText('Add to cart');

    await rntlUser.press(addToCartButton);

    const goToCartButton = await screen.findByText('Go to the cart');

    await rntlUser.press(goToCartButton);

    expect(screen.getByText('Cart example')).toBeOnTheScreen();
  });
});
