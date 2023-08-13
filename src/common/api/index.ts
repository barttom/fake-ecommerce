import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  CategoriesResponse,
  Product,
  ProductsRequestParams,
  ProductsResponse,
  SingleProductResponse,
} from './apiTypes';

const ROOT_API_URL = 'https://dummyjson.com/';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({baseUrl: ROOT_API_URL}),
  endpoints: build => ({
    allProducts: build.query<ProductsResponse, ProductsRequestParams>({
      query: ({category, skip, limit}) => {
        const baseUrl = `products${category ? `/category/${category}` : ''}`;

        return `${baseUrl}?limit=${limit}&skip=${skip}`;
      },
    }),
    singleProduct: build.query<SingleProductResponse, Product['id']>({
      query: id => `products/${id}`,
    }),
    categories: build.query<CategoriesResponse, void>({
      query: () => 'products/categories',
    }),
  }),
});

export const {
  useAllProductsQuery,
  useCategoriesQuery,
  useLazyAllProductsQuery,
  useSingleProductQuery,
} = rootApi;
