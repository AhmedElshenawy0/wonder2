import { ProductType, User, User_States } from "@/app/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers, login, register } from "../api-calls/user-api";
import { toast } from "react-hot-toast";
const initialState: User_States = {
  users: [],
  user: {} as User,
  loading: false,
  error: "",
  cart: (() => {
    try {
      return JSON.parse(localStorage!.getItem("cart-products") as string) || [];
    } catch {
      return [];
    }
  })(),
  openCart: false,
  usersCount: 0,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // array of the same product
      const sameProductsArrayById = state.cart.filter(
        (ele: ProductType) => ele.id === action.payload.id
      );
      if (sameProductsArrayById.length > 0) {
        const existingProduct = sameProductsArrayById.find(
          (ele: ProductType) => ele.color == action.payload.color
        );

        if (existingProduct) {
          existingProduct.quantity += action.payload.quantity;
        } else {
          state.cart.push(action.payload);
        }
      } else {
        state.cart.push(action.payload);
      }

      localStorage.setItem("cart-products", JSON.stringify(state.cart));
    },
    setOpenCart: (state, action) => {
      state.openCart = action.payload;
    },
    setIncrease: (state, action) => {
      const matchedIds = state.cart.filter(
        (ele: ProductType) => ele.id == action.payload.id
      );
      const item = matchedIds.find(
        (ele: ProductType) => ele.color == action.payload.color
      );
      item.quantity++;
      localStorage.setItem("cart-products", JSON.stringify(state.cart));
    },
    setDecrease: (state, action) => {
      const matchedIds = state.cart.filter(
        (ele: ProductType) => ele.id == action.payload.id
      );
      const item = matchedIds.find(
        (ele: ProductType) => ele.color == action.payload.color
      );
      item.quantity > 0 && item.quantity--;
      localStorage.setItem("cart-products", JSON.stringify(state.cart));
    },
    deleteFromCart: (state, action) => {
      const sameProductsArrayById = state.cart.filter(
        (ele: ProductType) => ele.id === action.payload.id
      );
      if (sameProductsArrayById.length > 0) {
        const existingProduct = sameProductsArrayById.find(
          (ele: ProductType) => ele.color == action.payload.color
        );

        if (existingProduct) {
          state.cart = state.cart.filter(
            (ele: ProductType) => ele.id != existingProduct.id
          );
        }
      }

      localStorage.setItem("cart-products", JSON.stringify(state.cart));
    },
  },

  extraReducers: (builder) => {
    // Extra Reducer for Fetch Users

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      console.log(state.users);
      state.usersCount = state.users.length;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Extra Reducer for Set Register

    builder.addCase(register.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.loading = false;
      state.user && localStorage.setItem("userID", action.payload.user.id);
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      console.log("loading...");
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : "error";
      console.log(action.payload);

      toast.error(action.payload, {
        duration: 8000,
      });
    });

    // Extra Reducer for Login

    builder.addCase(login.fulfilled, (state, action) => {
      action.payload.ok == true
        ? (state.user = action.payload)
        : (state.error = action.payload);
      console.log(action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(login.pending, (state) => {
      console.log("pending......");
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
      toast.error(action.payload);
      console.log(action.payload);
      state.loading = false;
    });

    // Extra Reducer for Delete User

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      toast.success("تمت حذف العميل بنجاح");
    });
    builder.addCase(deleteUser.pending, (state) => {
      console.log("pending......");
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      toast.error("Failed to register user", action.payload);
    });
  },
});

export const {
  addToCart,
  setOpenCart,
  setIncrease,
  setDecrease,
  deleteFromCart,
} = userSlice.actions;
export const usersReducer = userSlice.reducer;
