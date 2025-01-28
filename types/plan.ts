import { planSchema } from "@/schemas/planSchema";
import { z } from "zod";

export type TPlan = {
  id?: string;
} & z.infer<typeof planSchema>;
