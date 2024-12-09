"use client";

import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/product-slice";
import { usersReducer } from "./slices/user-slice";
import { articlesReducer } from "./slices/article-slice";

export const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// WHEN I WANT TO USE ISG
// ==> ADD TO FETCH ===> {next:{revalidate:120}}
