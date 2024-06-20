import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AppState} from '../redux';
import {
  AuthenticatedUserResponse,
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
  baseQuery: fetchBaseQuery({
    baseUrl: ROOT_API_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as AppState).auth.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
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
      query: () => 'products/category-list',
    }),
    authenticateUser: build.mutation<AuthResponse, AuthRequestParams>({
      query: body => {
        return {
          url: 'auth/login',
          method: 'POST',
          body,
        };
      },
    }),
    authenticatedUser: build.query<AuthenticatedUserResponse, void>({
      query: () => 'auth/me',
    }),
  }),
});

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/',
  }),
  endpoints: build => ({
    intents: build.mutation<{paymentIntent: string}, {amount: number}>({
      query: arg => ({
        url: 'payments/intents',
        method: 'POST',
        body: arg,
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
  useAuthenticatedUserQuery,
  useLazyAuthenticatedUserQuery,
} = rootApi;

export const {useIntentsMutation} = stripeApi;
