import { planSchema } from "@/schemas/planSchema";
import { z } from "zod";

export type PlanSchema = z.infer<typeof planSchema>;

//member is friends

export type TPlan = Omit<PlanSchema, "activities"> & {
  id: string;
  groupChatId: string;
  createByUserId: string;
  logs: string[];
  inviteCode: string;
  settingId: string[];
  activities: NonNullable<PlanSchema["activities"]>;
  createdAt: number;
  updatedAt: number;
};

export type TActivity = TPlan["activities"][number] & {
  id: string;
};
