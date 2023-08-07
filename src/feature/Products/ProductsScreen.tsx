import React from 'react';
import {FlatList} from 'react-native';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAllProductsQuery} from '../../common/api';
import {ProductItem} from './ProductItem';

export const ProductsScreen = () => {
  const {data} = useAllProductsQuery();

  if (!data) {
    return null;
  }

  return (
    <ScreenRollupWrapper>
      <FlatList
        data={data.products}
        keyExtractor={({id}) => id.toString()}
        renderItem={({item: {title, thumbnail, price, id}}) => (
          <ProductItem
            title={title}
            thumbnail={thumbnail}
            price={price}
            id={id}
          />
        )}
      />
    </ScreenRollupWrapper>
  );
};
