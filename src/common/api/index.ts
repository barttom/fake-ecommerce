import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  AuthRequestParams,
  AuthResponse,
  CategoriesResponse,
  Product,
  ProductsRequestParams,
  ProductsResponse,
  SingleProductResponse,
} from './apiTypes';

export const ROOT_API_URL = 'https://dummyjson.com/';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({baseUrl: ROOT_API_URL}),
  refetchOnReconnect: true,
  refetchOnFocus: true,
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
    authenticateUser: build.mutation<AuthResponse, AuthRequestParams>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAllProductsQuery,
  useCategoriesQuery,
  useLazyAllProductsQuery,
  useSingleProductQuery,
  useAuthenticateUserMutation,
} = rootApi;
