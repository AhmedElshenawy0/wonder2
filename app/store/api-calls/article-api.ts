import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createArticle: any = createAsyncThunk(
  "article/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/articles", {
        title: data.title,
        description: data.description,
        image: data.image,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchArticles: any = createAsyncThunk(
  "articles/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/articles");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchOneArticle: any = createAsyncThunk(
  "articles/fetchOneArticle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/articles/${id}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
