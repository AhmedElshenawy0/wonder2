export type Sales = {
  id: number;
  count: number;
  user: User;
  product: ProductType;
};
export type ProductType = {
  id: number;
  name: string;
  price: string;
  color: string;
  sizes: string[];
  quantity: number;
  category: string;
  categoryAr: string;
  image: any | undefined;
  images?: any | undefined;
  sales?: Sales[] | undefined;
  available?: any[];
};

export type User = {
  id?: number;
  name?: string;
  userName?: string;
  email?: string;
  phone?: string;
  company?: string;
  mobileNumber?: number;
};

export interface ErrorType {
  status: number;
  data: {
    message: string;
  };
}

export type User_States = {
  users: User[];
  user?: User;
  loading: boolean;
  error: string | null;
  cart: any | undefined;
  openCart: boolean;
  usersCount: number;
};
