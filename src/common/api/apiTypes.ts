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

export type Category = string;
export type CategoriesResponse = Category[];
