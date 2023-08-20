import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import {Product} from '../../common/api/apiTypes';
import {CartScreenProps} from '../../common/components/Navigator';
import {ImageSlider} from '../../common/components/ImageSlider';
import {AddToCartButton} from '../Cart';
import {StockStatus} from '../../common/components/StockStatus';

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

const styles = StyleSheet.create({
  addToCartContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
