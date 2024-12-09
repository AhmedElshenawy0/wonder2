export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  userName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin?: boolean;
};

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  userName: string;
};

export type Product_Created = {
  name: string;
  price: number;
  color: string;
  category: string;
  categoryAr: string;
  sizes: string[] | any[];
  image: any;
};

export type AvailableProduct = {
  id: number;
  color: string;
  image: string;
  size: string;
  productId: number;
};
