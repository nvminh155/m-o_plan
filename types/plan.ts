import { planSchema } from "@/schemas/planSchema";
import { z } from "zod";

export type PlanSchema = z.infer<typeof planSchema>;

//member is friends

export type TPlan = PlanSchema & {
  id?: string;
  groupChatId: string;
  createByUserId: string;
  logs: string[];
  inviteCode: string;
  settingId: string[];
  createdAt: number;
  updatedAt: number;
};

export type TActivity = keyof (keyof Pick<TPlan, "activities">)[number];
