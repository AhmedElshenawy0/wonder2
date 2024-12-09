import { z } from "zod";

// Article schema validation
export const articlesSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(3, { message: "title should be at least 3 characters" })
    .max(40, {
      message: "title should be less than 200 characters ",
    }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(3, { message: "description should be at least 3 characters" }),
});

// Register schema validation
export const userSchema = z.object({
  userName: z
    .string({
      required_error: "user name is required",
      invalid_type_error: "user name should me type of string",
    })
    .min(3, { message: "user name should be at least 3 characters" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should me type of string",
    })
    .email({ message: "this email is not valid" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should me type of string",
    })
    .min(6, { message: "password should be at least 6 characters" }),
  phone: z
    .string({
      required_error: "phone is required",
      invalid_type_error: "phone should me type of string",
    })
});

// Login schema validation
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be type of string",
    })
    .email({ message: "This email is not valid" }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be type of string",
    })
    .min(6, { message: "Password should be more than 6 characters" })
    .max(100, { message: "Password should be less than 100 characters" }),
});
