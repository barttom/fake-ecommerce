import React from 'react';
import {Card, Chip, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../../common/api/apiTypes';
import {SingleProductScreenProps} from '../../common/components/Navigator';

export type ProductItemProps = Pick<
  Product,
  'id' | 'title' | 'price' | 'thumbnail'
>;

export const ProductItem = ({
  thumbnail,
  title,
  price,
  id,
}: ProductItemProps) => {
  const {navigate} = useNavigation<SingleProductScreenProps['navigation']>();
  const handleNavigation = () => {
    navigate('SingleProduct', {productId: id});
  };
  return (
    <Card
      mode="elevated"
      style={styles.card}
      accessible
      onPress={handleNavigation}>
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
        <IconButton icon="cart-plus" mode="outlined" />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    overflow: 'hidden',
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
