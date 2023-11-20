export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: 'string';
  thumbnail: string;
  images: string[];
};

export type ProductsRequestParams = {
  category: string;
  skip: number;
  limit: number;
};

export type ProductsResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

export type SingleProductResponse = Product;

export type Category = string;
export type CategoriesResponse = Category[];

export type AuthRequestParams = {
  username: string;
  password: string;
};

export type AuthResponse = User;

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};
