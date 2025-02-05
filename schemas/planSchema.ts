import { z } from "zod";

export const piggyBankSchema = z.object({
  amountGoal: z.number(),
  amountPeriod: z.number(),
  periodDay: z.number().min(1).max(31),
  currentMoney: z.number().default(0),
  endDate: z.number(),
});

export const activitiesSchema = z.array(
  z.object({
    title: z.string().nonempty().max(50),
    description: z.string().nonempty().max(200),
    startDate: z.number(),
    endDate: z.number(),
  })
);

export const planSchema = z.object({
  piggyBank: piggyBankSchema.optional(),
  activities: activitiesSchema.optional(),
  friends: z.array(z.string().nonempty()).optional(),
  thumbnail: z.string().optional(),
  title: z.string().nonempty().max(50),
  startDate: z.number(),
  endDate: z.number(),
});
