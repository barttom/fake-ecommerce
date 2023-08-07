import React from 'react';
import {Card, Chip, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Product} from '../../common/api/apiTypes';

export type ProductItemProps = Pick<
  Product,
  'id' | 'title' | 'price' | 'thumbnail'
>;

export const ProductItem = ({thumbnail, title, price}: ProductItemProps) => {
  const renderPrice = () => (
    <>
      <Chip icon="currency-usd" mode="flat" style={styles.priceBadge}>
        {price}
      </Chip>
      <IconButton icon="basket" mode="outlined" />
    </>
  );

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Cover
        source={{uri: thumbnail}}
        theme={{
          roundness: 0,
        }}
      />
      <Card.Title
        titleVariant="titleMedium"
        title={title.toUpperCase()}
        right={renderPrice}
        rightStyle={styles.titleRight}
        titleNumberOfLines={2}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 32,
    overflow: 'hidden',
  },
  priceBadge: {
    height: 32,
  },
  titleRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
