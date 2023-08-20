import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Snackbar, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  CartScreenProps,
  SingleProductScreenProps,
} from '../../common/components/Navigator';
import {useSingleProductQuery} from '../../common/api';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {ImageSlider} from '../../common/components/ImageSlider';
import {AddToCartButton} from '../Cart';
import {StockStatus} from '../../common/components/StockStatus';
import {Product} from '../../common/api/apiTypes';

export const SingleProduct = ({data}: {data: Product}) => {
  const snackbarTimeoutId = useRef(0);
  const {navigate} = useNavigation<CartScreenProps['navigation']>();

  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);
  const showCartInfo = () => setIsCartInfoVisible(true);
  const hideCartInfo = () => setIsCartInfoVisible(false);

  useEffect(() => {
    if (isCartInfoVisible) {
      clearTimeout(snackbarTimeoutId.current);
      snackbarTimeoutId.current = setTimeout(hideCartInfo, 5000);
    }
    return () => clearTimeout(snackbarTimeoutId.current);
  }, [isCartInfoVisible]);

  return (
    <>
      {data && (
        <ScrollView>
          <ImageSlider images={data.images || []} />
          <View style={styles.addToCartContainer}>
            <AddToCartButton
              cartItem={{
                id: data.id,
                stock: data.stock,
                title: data.title,
                thumbnail: data.thumbnail,
                price: data.price,
              }}
              onAddToCart={showCartInfo}
            />
            <StockStatus quantity={data.stock} />
          </View>
          <Text variant="bodyLarge">{data.description}</Text>
        </ScrollView>
      )}
      <Snackbar
        visible={isCartInfoVisible}
        onDismiss={hideCartInfo}
        action={{
          label: 'Go to the cart',
          onPress: () => {
            navigate('Cart');
          },
        }}>
        Your product has been added to cart
      </Snackbar>
    </>
  );
};

export const SingleProductScreen = () => {
  const {params} = useRoute<SingleProductScreenProps['route']>();
  const {setOptions} = useNavigation();
  const {data, isLoading} = useSingleProductQuery(params.productId);

  useEffect(() => {
    setOptions({headerTitle: data?.title || ''});

    return () => setOptions({headerTitle: ''});
  }, [data, setOptions]);

  return (
    <ScreenRollupWrapper isLoading={isLoading}>
      {data && <SingleProduct data={data} />}
    </ScreenRollupWrapper>
  );
};

const styles = StyleSheet.create({
  addToCartContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
