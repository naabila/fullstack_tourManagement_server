
import { z } from "zod";

/**
 * Zod validation schema for creating a new user
 */
export const createUserZodSchema = z.object({
  name: z.string({ error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: z.string({ error: "Email must be a string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),

  password: z.string({ error: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
    .regex(/(?=.*[!@#$%&*])/, { message: "Password must contain at least 1 special character." })
    .regex(/(?=.*\d)/, { message: "Password must contain at least 1 number." }),

  phone: z.string({ error: "Phone Number must be a string" })
    .regex(/^(?:\+8801|01)\d{9}$/, {
      message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  address: z.string({ error: "Address must be a string" })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),

     role: z.enum(["USER","ADMIN","GUIDE","SUPER_ADMIN"]).optional()

  // You can add more fields here if needed: picture, isDeleted, isActive, isVerified, auths
});


 export const updateUserZodSchema = z.object({
  name: z.string({ error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }).optional(),
password: z.string({ error: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
    .regex(/(?=.*[!@#$%&*])/, { message: "Password must contain at least 1 special character." })
    .regex(/(?=.*\d)/, { message: "Password must contain at least 1 number." }).optional(),

  phone: z.string({ error: "Phone Number must be a string" })
    .regex(/^(?:\+8801|01)\d{9}$/, {
      message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  address: z.string({ error: "Address must be a string" })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
    role: z.enum(["USER","ADMIN","GUIDE"]).optional()

  // You can add more fields here if needed: picture, isDeleted, isActive, isVerified, auths
});