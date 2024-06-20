// eslint-disable-next-line import/no-extraneous-dependencies
import {rest} from 'msw';
import {ROOT_API_URL} from '../index';

export const productsSmartphonesMocked = [
  {
    brand: 'Apple',
    category: 'smartphones',
    description: 'An apple mobile which is nothing like apple',
    discountPercentage: 12.96,
    id: 1,
    images: [
      'https://i.dummyjson.com/data/products/1/1.png',
      'https://i.dummyjson.com/data/products/1/2.jpg',
    ],
    price: 549,
    rating: 4.69,
    stock: 94,
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    title: 'iPhone 9',
  },
  {
    brand: 'Apple',
    category: 'smartphones',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    discountPercentage: 17.94,
    id: 2,
    images: [
      'https://i.dummyjson.com/data/products/2/1.png',
      'https://i.dummyjson.com/data/products/2/2.jpg',
    ],
    price: 899,
    rating: 4.44,
    stock: 34,
    thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    title: 'iPhone X',
  },
  {
    brand: 'Samsung',
    category: 'smartphones',
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    discountPercentage: 15.46,
    id: 3,
    images: [
      'https://i.dummyjson.com/data/products/3/1.png',
      'https://i.dummyjson.com/data/products/3/2.jpg',
    ],
    price: 1249,
    rating: 4.09,
    stock: 36,
    thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
    title: 'Samsung Universe 9',
  },
];
export const productsLaptopsMocked = [
  {
    brand: 'Apple',
    category: 'laptops',
    description:
      'MacBook Pro 2021 with mini-LED display may launch between September, November',
    discountPercentage: 11.02,
    id: 6,
    images: [
      'https://i.dummyjson.com/data/products/6/1.png',
      'https://i.dummyjson.com/data/products/6/2.jpg',
    ],
    price: 1749,
    rating: 4.57,
    stock: 83,
    thumbnail: 'https://i.dummyjson.com/data/products/6/thumbnail.png',
    title: 'MacBook Pro',
  },
  {
    brand: 'Samsung',
    category: 'laptops',
    description:
      'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched',
    discountPercentage: 4.15,
    id: 7,
    images: [
      'https://i.dummyjson.com/data/products/7/1.jpg',
      'https://i.dummyjson.com/data/products/7/2.jpg',
    ],
    price: 1499,
    rating: 4.25,
    stock: 50,
    thumbnail: 'https://i.dummyjson.com/data/products/7/thumbnail.jpg',
    title: 'Samsung Galaxy Book',
  },
];

export const productsMocked = {
  limit: 15,
  products: [...productsSmartphonesMocked, ...productsLaptopsMocked],
  skip: 0,
  total: 100,
};
export const productsSecondPageMocked = {
  limit: 15,
  products: productsSmartphonesMocked,
  skip: 15,
  total: 100,
};

const categoriesMocked = ['smartphones', 'laptops'];

export const loginResponseMocked = {
  email: 'emily.johnson@x.dummyjson.com',
  firstName: 'Emily',
  gender: 'female',
  id: 1,
  image: 'https://dummyjson.com/icon/emilys/128',
  lastName: 'Johnson',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MTg4MjUyNjcsImV4cCI6MTcyMTQxNzI2N30.AyRZB1sONOkYjfTeYIZrnnrVLHbQEQyTMvQAGJihpKg',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MTg4MjUyNjcsImV4cCI6MTcxODgyODg2N30.PZke23h0CUxnVSQ1HEidzJqHG7uq4j5z1s-fKuIbOJo',
  username: 'emilys',
};

export const authenticatedUserMocked = {
  address: {
    address: '626 Main Street',
    city: 'Phoenix',
    coordinates: {lat: -77.16213, lng: -92.084824},
    country: 'United States',
    postalCode: '29112',
    state: 'Mississippi',
    stateCode: 'MS',
  },
  email: 'emily.johnson@x.dummyjson.com',
  firstName: 'Emily',
  gender: 'female',
  id: 1,
  image: 'https://dummyjson.com/icon/emilys/128',
  lastName: 'Johnson',
  phone: '+81 965-431-3024',
  username: 'emilys',
};

export const productsHandlers = [
  rest.get(`${ROOT_API_URL}products`, (req, res, ctx) => {
    const skipParam = req.url.searchParams.get('skip');

    if (skipParam === '15') {
      return res(ctx.status(200), ctx.json(productsSecondPageMocked));
    }

    return res(ctx.status(200), ctx.json(productsMocked));
  }),
  rest.get(`${ROOT_API_URL}products/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsSmartphonesMocked[0]));
  }),
  rest.get(`${ROOT_API_URL}products/category/laptops`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        limit: 15,
        products: productsLaptopsMocked,
        skip: 0,
        total: 10,
      }),
    );
  }),
  rest.get(`${ROOT_API_URL}products/category-list`, (_, res, ctx) =>
    res(ctx.json(categoriesMocked)),
  ),
  rest.post(`${ROOT_API_URL}auth/login`, async (req, res, ctx) => {
    const body = await req.json();

    if (body.username === 'emilys' && body.password === 'emilyspass') {
      return res(ctx.json(loginResponseMocked));
    }

    return res(ctx.status(400), ctx.json({message: 'Invalid credentials'}));
  }),
  rest.get(`${ROOT_API_URL}auth/me`, (_, res, ctx) =>
    res(ctx.json(authenticatedUserMocked)),
  ),
];
