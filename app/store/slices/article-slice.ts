import { createSlice } from "@reduxjs/toolkit";
import { createArticle, fetchArticles } from "../api-calls/article-api";

const initialState = {
  articles: [] as any,
  loading: false as boolean,
};
export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Articles
    builder.addCase(createArticle.fulfilled, (state, action) => {
      console.log("success");
      state.loading = false;
    });
    builder.addCase(createArticle.pending, (state, action) => {
      console.log("loading...");
      state.loading = true;
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      console.log("error...");
      state.loading = false;
    });

    // Fetch Articles
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      console.log(action.payload);
      state.articles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchArticles.pending, (state, action) => {
      console.log("loading...");
      state.loading = true;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      console.log("error...");
      state.loading = false;
    });
  },
});

export const articlesReducer = articleSlice.reducer;
