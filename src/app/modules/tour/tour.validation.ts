import z from "zod";

export const createTourTypeZodSchema=z.object({
  name: z.string({error:"Tour type must be a string"})
  .min(3,{message:"Name must be at least 3 charecter long"}),
});

export const updateTourTypeZodSchema=z.object({
  name: z.string({error:"Tour type must be a string"})
  .min(3,{message:"Name must be at least 3 charecter long"}).optional(),
});