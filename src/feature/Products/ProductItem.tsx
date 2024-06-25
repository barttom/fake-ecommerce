import React from 'react';
import {Card, Chip} from 'react-native-paper';
import {Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../../common/api/apiTypes';
import {SingleProductScreenProps} from '../../common/components/Navigator';
import {StockStatus} from '../../common/components/StockStatus';

export type ProductItemProps = Pick<
  Product,
  'id' | 'title' | 'price' | 'thumbnail' | 'stock'
>;

export const ProductItem = ({
  thumbnail,
  title,
  price,
  id,
  stock,
}: ProductItemProps) => {
  const {navigate} = useNavigation<SingleProductScreenProps['navigation']>();
  const handleNavigation = () => {
    navigate('SingleProduct', {productId: id});
  };
  return (
    <View style={styles.wrapper} testID="product-item">
      <Pressable
        accessibilityRole="button"
        onPress={handleNavigation}
        accessibilityLabel={`Product: ${title}`}>
        <Card mode="elevated" style={styles.card}>
          <Card.Cover
            source={{uri: thumbnail}}
            theme={{
              roundness: 0,
            }}
          />
          <Card.Title
            titleVariant="titleMedium"
            title={title.toUpperCase()}
            rightStyle={styles.titleRight}
          />
          <Card.Content style={styles.titleRight}>
            <Chip
              icon="currency-usd"
              style={styles.priceBadge}
              elevated
              elevation={2}>
              {price}
            </Chip>
            <StockStatus quantity={stock} />
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  card: {
    marginBottom: 16,
  },
  priceBadge: {
    height: 32,
  },
  titleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
