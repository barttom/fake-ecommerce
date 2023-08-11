import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useCategoriesQuery, useLazyAllProductsQuery} from '../../common/api';
import {Dropdown, DropdownOption} from '../../common/components/Dropdown';
import {mapStringArrayToOptions} from '../../common/utils/helpers';
import {ProductsRequestParams} from '../../common/api/apiTypes';
import {ProductItem} from './ProductItem';

const QUERY_LIMIT = 15;

export const ProductsScreen = () => {
  const [filters, setFilters] = useState<Omit<ProductsRequestParams, 'limit'>>({
    category: '',
    skip: 0,
  });

  const [fetchProducts, {data: productsData, isLoading: isProductsLoading}] =
    useLazyAllProductsQuery();
  const {data: categories, isLoading: isCategoriesLoading} =
    useCategoriesQuery();

  const handleChoseCategory = (newCategory: DropdownOption['value']) => {
    setFilters({
      category: newCategory as string,
      skip: 0,
    });
  };
  const handleChangePage = (newPage: number) => {
    setFilters({
      ...filters,
      skip: newPage * QUERY_LIMIT,
    });
  };
  const isLoading = isCategoriesLoading || isProductsLoading;
  const content = useMemo(
    () => (
      <FlatList
        data={productsData?.products}
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
    ),
    [productsData],
  );

  useEffect(() => {
    fetchProducts({
      ...filters,
      limit: QUERY_LIMIT,
    });
  }, [filters]);

  return (
    <>
      {categories && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: 16,
          }}>
          <Text variant="titleMedium">Category: </Text>
          <Dropdown
            options={mapStringArrayToOptions(categories)}
            onSelect={handleChoseCategory}
          />
        </View>
      )}
      {productsData && (
        <ScreenRollupWrapper isLoading={isLoading}>
          {content}
        </ScreenRollupWrapper>
      )}
      {productsData && (
        <DataTable.Pagination
          page={filters.skip / QUERY_LIMIT}
          numberOfPages={Math.ceil(productsData.total / QUERY_LIMIT)}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};
