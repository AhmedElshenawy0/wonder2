import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ===> Get All Users

type Fetch_Users_Sale = {
  id: number;
  productId: number;
  userId: number;
  count: number;
  createdAt: string;
};
type Fetch_Users = {
  id: number;
  email: string;
  userName: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  company: string;
  createdAt: string;
  updatedAt: string;
  sales?: Fetch_Users_Sale[];
};

export const fetchUsers: any = createAsyncThunk(
  "products/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .get("http://localhost:3000/api/users")
        .then((res) => res.data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ===> Set User

interface RegisterData {
  userName: string;
  email: string;
  password: string;
  phone: string;
}

export const register: any = createAsyncThunk(
  "products/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          userName: data.userName,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response); // Log the error for debugging
      return rejectWithValue(error.response || error || "Unknown error");
    }
  }
);

interface LoginData {
  email: string;
  password: string;
}

export const login: any = createAsyncThunk(
  "products/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Unknown error"
      );
    }
  }
);

// ===> DELETE User

export const deleteUser: any = createAsyncThunk(
  "users/deleteUser",
  async (id: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
