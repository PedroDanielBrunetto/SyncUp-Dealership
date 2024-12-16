import { z } from "zod";

export const insertSpecificModelSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  model: z.string(),
});
