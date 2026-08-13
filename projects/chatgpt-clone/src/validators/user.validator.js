import { z } from "zod";

export const signupValidatorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  age: z
    .number()
    .trim()
    .min(0, "Age must be a positive number")
    .max(120, "Age must be a valid age")
    .optional(),
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : ""),
    z.email("Please provide a valid email address"),
  ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*()\-+]/,
      "Password must contain at least one special character",
    ),
});

export const loginValidatorSchema = z.object({
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : ""),
    z.email("Please provide a valid email address"),
  ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*()\-+]/,
      "Password must contain at least one special character",
    ),
});
