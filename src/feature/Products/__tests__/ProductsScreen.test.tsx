import React from 'react';
import {act, screen} from '@testing-library/react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import {renderWithProviders, rntlUser} from '../../../common/utils/testHelpers';
import {ProductsScreen} from '../ProductsScreen';
import {
  productsLaptopsMocked,
  productsMocked,
  productsSmartphonesMocked,
} from '../../../common/api/msw-mocks/productsHandlers';

const Stack = createStackNavigator();
const ExampleSingleProduct = () => <Text>Example product</Text>;
const wrapper = (
  <Stack.Navigator>
    <Stack.Screen name="Products" component={ProductsScreen} />
    <Stack.Screen name="SingleProduct" component={ExampleSingleProduct} />
  </Stack.Navigator>
);

describe('<ProductsScreen/>', () => {
  it('Renders properly product list', async () => {
    renderWithProviders(wrapper);

    const productItems = await screen.findAllByLabelText('Product:', {
      exact: false,
    });

    expect(productItems).toHaveLength(productsMocked.products.length);
  });

  it('User is able to move to the next page', async () => {
    renderWithProviders(wrapper);

    await act(async () => {
      await rntlUser.press(await screen.findByLabelText('chevron-right'));
    });

    expect(screen.getAllByLabelText('Product:', {exact: false})).toHaveLength(
      productsSmartphonesMocked.length,
    );
  });

  it('User is able to display products in category', async () => {
    renderWithProviders(wrapper);

    await act(async () => {
      await rntlUser.press(await screen.findByText('All'));
      await rntlUser.press(await screen.findByText('LAPTOPS'));
    });

    expect(screen.getAllByLabelText('Product:', {exact: false})).toHaveLength(
      productsLaptopsMocked.length,
    );
  });

  it('User is able to navigate to the single product', async () => {
    renderWithProviders(wrapper);

    const productItems = await screen.findAllByLabelText('Product:', {
      exact: false,
    });

    await act(async () => {
      await rntlUser.press(productItems[0]);
    });

    const exampleProduct = await screen.findByText('Example product');

    expect(exampleProduct).toBeOnTheScreen();
  });
});
