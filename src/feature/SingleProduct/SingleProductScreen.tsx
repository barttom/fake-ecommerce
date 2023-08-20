import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SingleProductScreenProps} from '../../common/components/Navigator';
import {useSingleProductQuery} from '../../common/api';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {ImageSlider} from '../../common/components/ImageSlider';
import {AddToCartButton} from '../Cart';
import {StockStatus} from '../../common/components/StockStatus';

export const SingleProductScreen = () => {
  const {params} = useRoute<SingleProductScreenProps['route']>();
  const {setOptions} = useNavigation();
  const {data, isLoading} = useSingleProductQuery(params.productId);

  useEffect(() => {
    setOptions({headerTitle: data?.title});

    return () => setOptions({headerRTitle: ''});
  }, [data, setOptions]);

  return (
    <ScreenRollupWrapper isLoading={isLoading}>
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
            />
            <StockStatus quantity={data.stock} />
          </View>
          <Text variant="bodyLarge">{data.description}</Text>
        </ScrollView>
      )}
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
