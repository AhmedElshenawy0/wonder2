import { ProductType } from "@/app/types/types";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { RootState, AppDispatch } from "@/app/store/store";

export interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  extra: unknown;
  rejectValue: string | unknown;
}
// Get All Products
export const fetchProducts: AsyncThunk<ProductType[], void, AsyncThunkConfig> =
  createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
    try {
      const { data }: { data: ProductType[] } = await axios.get("/api/product");

      return data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "An error occurred when fetching products"
      );
    }
  });

// Get One Product
export const getOneProduct: any = createAsyncThunk(
  "products/getOneProduct",
  async (productId: number | string, { rejectWithValue }) => {
    if (!productId) {
      return rejectWithValue("Product ID is required.");
    }

    try {
      // API request
      const { data }: { data: ProductType } = await axios.get(
        `/api/product/${productId}`
      );

      return data;
    } catch (error: any) {
      console.error(`Error fetching product with ID ${productId}:`, error);

      // Handle Axios-specific error structure
      const errorMessage =
        error.response?.data ||
        error.message ||
        "An error occurred while fetching the product.";

      return rejectWithValue(errorMessage);
    }
  }
);
// Get One Category
export const getProductByCategory: AsyncThunk<
  ProductType[],
  void,
  AsyncThunkConfig
> = createAsyncThunk(
  "products/category",
  async (category, { rejectWithValue }) => {
    try {
      if (category!) {
        const response = await axios
          .get(`/api/product/category/${category}`)
          .then((res) => res.data);
        return response;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Update Product
export const updateProduct: AsyncThunk<ProductType, void, AsyncThunkConfig> =
  createAsyncThunk(
    "products/updateProduct",
    async (productId, { rejectWithValue }) => {
      try {
        const { data } = await axios
          .put(`/api/product/${productId}`)
          .then((res) => res.data);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

// Create Product
export const createProduct: AsyncThunk<
  ProductType,
  Partial<ProductType>,
  AsyncThunkConfig
> = createAsyncThunk(
  "products/create-product",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/product", {
        name: data.name,
        price: +data.price,
        color: data.color,
        category: data.category,
        image: data.image,
        sizes: data.sizes,
      });
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Delete Product
export const deleteProduct: AsyncThunk<
  { message: string; id: number },
  any,
  AsyncThunkConfig
> = createAsyncThunk(
  "products/delete-product",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/product/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
