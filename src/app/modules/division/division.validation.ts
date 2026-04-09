import z from "zod";

export const createDivisionZodSchema=z.object({
name:z.string().min(3,{message:"name must be atleast 3 charecter long"}),
thumbnail:z.string().optional(),
description:z.string().optional()
});

export const updateDivisionZodSchema=z.object({
name:z.string().min(3,{message:"name must be atleast 3 charecter long"}).optional(),
thumbnail:z.string().optional(),
description:z.string().optional()
});

