"use client";
import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/app/types/types";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  getOneProduct,
  getProductByCategory,
  updateProduct,
} from "../api-calls/productApis";
import { toast } from "react-hot-toast";

export type States = {
  allProducts: ProductType[];
  filteredProduct: ProductType[];
  oneProduct: ProductType;
  loading: boolean;
  error: string | undefined;
  categoryFilter?: string;
  category: string;
  productsCount: number;
  priceFilter: string;
};

const initialState: States = {
  allProducts: [],
  filteredProduct: [],
  oneProduct: {} as ProductType,
  loading: false,
  error: "",
  categoryFilter: "",
  category: "الكل",
  productsCount: 0,
  priceFilter: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filteredProduct = state.allProducts.filter(
        (ele) => ele.category == action.payload
      );
      state.categoryFilter = action.payload;
      state.category = action.payload;
      state.productsCount = state.filteredProduct.length;
    },
    setFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      action.payload == "low"
        ? (state.filteredProduct[0]
            ? (state.filteredProduct = state.filteredProduct.sort(
                (a: any, b: any) => +a.price - +b.price
              ))
            : (state.allProducts = state.allProducts.sort(
                (a: any, b: any) => +a.price - +b.price
              )),
          (state.priceFilter = action.payload))
        : state.filteredProduct[0]
        ? (state.filteredProduct = state.filteredProduct.sort(
            (a: any, b: any) => +b.price - +a.price
          ))
        : ((state.allProducts = state.allProducts.sort(
            (a: any, b: any) => +b.price - +a.price
          )),
          (state.priceFilter = action.payload),
          console.log(state.priceFilter));
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.loading = false;
      console.log(state.allProducts);
      state.category = "الكل";
      state.filteredProduct = [];
      state.categoryFilter = "الكل";
      state.productsCount = state.allProducts.length;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      console.log("loading");
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message;
      console.log("error", action.error);
    });

    // Update Product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Get One Product
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      state.oneProduct = action.payload;
    });
    builder.addCase(getOneProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Create Products
    builder.addCase(createProduct.fulfilled, (state, action) => {
      toast.success("تم إضافة المنتج بنجاح");
      state.loading = false;
      location.reload();
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      console.log("error");
      toast.error("لم تتم إضافة المنتج");
      state.loading = false;
    });

    // Get Product By Category
    builder.addCase(getProductByCategory.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    });
    builder.addCase(getProductByCategory.pending, (state) => {
      console.log("Loading...");
    });
    builder.addCase(getProductByCategory.rejected, (state, action) => {
      console.log("error");
    });

    // Delete Product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      toast.success("تم حذف المنتج بنجاح");
      state.loading = false;
      state.allProducts = state.allProducts.filter(
        (ele) => ele.id != action.payload.id
      );
      console.log(action.payload);
    });
    builder.addCase(deleteProduct.pending, (state) => {
      console.log("Loading...");
      state.loading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      toast.error("لم يتم حذف المنتج!!");
      state.loading = false;
    });
  },
});

export const { setCategoryFilter, setPriceFilter, setFilter } =
  productsSlice.actions;

export const productsReducer = productsSlice.reducer;
