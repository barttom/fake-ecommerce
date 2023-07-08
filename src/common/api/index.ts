import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ProductsResponse} from './apiTypes';

const ROOT_API_URL = 'https://dummyjson.com/';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({baseUrl: ROOT_API_URL}),
  endpoints: build => ({
    allProducts: build.query<ProductsResponse, void>({
      query: () => `products`,
    }),
  }),
});

export const {useAllProductsQuery} = rootApi;
