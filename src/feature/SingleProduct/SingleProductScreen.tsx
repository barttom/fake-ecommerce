import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Chip, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SingleProductScreenProps} from '../../common/components/Navigator';
import {useSingleProductQuery} from '../../common/api';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {ImageSlider} from '../../common/components/ImageSlider';

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
      <ScrollView>
        <ImageSlider images={data?.images || []} />
        <View style={styles.addToCartContainer}>
          <Chip style={styles.stock}>{`${data?.stock} in stock`}</Chip>
          <Button mode="contained">Add to cart</Button>
        </View>
        <Text variant="bodyLarge">{data?.description}</Text>
      </ScrollView>
    </ScreenRollupWrapper>
  );
};

const styles = StyleSheet.create({
  addToCartContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  stock: {
    width: 120,
  },
});
