import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useCategoriesQuery, useLazyAllProductsQuery} from '../../common/api';
import {Dropdown, DropdownOption} from '../../common/components/Dropdown';
import {mapStringArrayToOptions} from '../../common/utils/helpers';
import {ProductsRequestParams} from '../../common/api/apiTypes';
import {NoDataPlaceholder} from '../../common/components/NoDataPlaceholder';
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
  const categoriesOptions = mapStringArrayToOptions(categories);
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
      <ScreenRollupWrapper isLoading={isLoading}>
        <FlatList
          data={productsData?.products}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item: {title, thumbnail, price, id, stock}}) => (
            <ProductItem
              id={id}
              title={title}
              thumbnail={thumbnail}
              price={price}
              stock={stock}
            />
          )}
        />
      </ScreenRollupWrapper>
    ),
    [productsData, isLoading],
  );

  useEffect(() => {
    fetchProducts({
      ...filters,
      limit: QUERY_LIMIT,
    });
  }, [filters, fetchProducts]);

  if ((!isLoading && !productsData) || productsData?.products.length === 0) {
    return <NoDataPlaceholder message="No products with chosen criteria" />;
  }

  return (
    <>
      {categories && (
        <View style={styles.filtersContainer}>
          <Text variant="titleMedium">Category: </Text>
          <Dropdown
            options={categoriesOptions}
            onSelect={handleChoseCategory}
            initialChosenOption={categoriesOptions[0]}
          />
        </View>
      )}
      {content}
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

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 16,
  },
});
