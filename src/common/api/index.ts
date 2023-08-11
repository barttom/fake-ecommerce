import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CategoriesResponse, ProductsResponse} from './apiTypes';

const ROOT_API_URL = 'https://dummyjson.com/';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({baseUrl: ROOT_API_URL}),
  endpoints: build => ({
    allProducts: build.query<ProductsResponse, string>({
      query: category => `products${category ? `/category/${category}` : ''}`,
    }),
    categories: build.query<CategoriesResponse, void>({
      query: () => 'products/categories',
    }),
  }),
});

export const {useAllProductsQuery, useCategoriesQuery} = rootApi;
