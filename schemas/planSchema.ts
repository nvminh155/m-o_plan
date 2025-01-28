import { z } from "zod";

export const piggyBankSchema = z.object({
  amountGoal: z.number(),
  amountPeriod: z.number(),
  periodDay: z.number().min(1).max(31),
  endDate: z.number(),
});

export const activitySchema = z.object({
  title: z.string().nonempty().max(50),
  description: z.string().nonempty().max(200),
  startDate: z.number(),
  endDate: z.number(),
});

export const friendsSchema = z.array(z.string().nonempty());

export const step1Schema = z.object({
  title: z.string().nonempty().max(50),
  startDate: z.number(),
  endDate: z.number(),
});

export const planSchema = z
  .object({
    piggyBank: piggyBankSchema.optional(),
    activities: z.array(activitySchema).optional(),
    friends: friendsSchema.optional(),
    thumbnail: z.string().optional(),
  })
  .extend({
    step1Schema,
  });
