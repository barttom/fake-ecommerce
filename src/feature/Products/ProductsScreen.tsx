import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import {ScreenRollupWrapper} from '../../common/components/ScreenRollupWrapper';
import {useAllProductsQuery, useCategoriesQuery} from '../../common/api';
import {Dropdown, DropdownOption} from '../../common/components/Dropdown';
import {mapStringArrayToOptions} from '../../common/utils/helpers';
import {ProductItem} from './ProductItem';

const QUERY_LIMIT = 15;

export const ProductsScreen = () => {
  const [page, setPage] = useState(0);
  const [currentCategory, setCurrentCategory] =
    useState<DropdownOption['value']>('');
  const {data: productsData, isLoading: isProductsLoading} =
    useAllProductsQuery({
      category: currentCategory as string,
      limit: QUERY_LIMIT,
      skip: page * QUERY_LIMIT,
    });
  const {data: categories, isLoading: isCategoriesLoading} =
    useCategoriesQuery();
  const handleChoseCategory = (newCategory: DropdownOption['value']) => {
    setCurrentCategory(newCategory);
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
    setPage(0);
  }, [currentCategory]);

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
          page={page}
          numberOfPages={Math.ceil(productsData.total / QUERY_LIMIT)}
          onPageChange={page => {
            setPage(page);
          }}
        />
      )}
    </>
  );
};
