import { z } from "zod";

export const piggyBankSchema = z.object({
  amountGoal: z.number().min(0),
  amountPeriod: z.number().min(0),
  periodDay: z.number().min(1).max(31),
  currentMoney: z.number().min(0).default(0),
  endDate: z.number(),
});

// .refine((data) => data.toHours > data.fromHours, {
//   message: "toHours must be greater than fromHours",
// })

export const activitySchema = z.object({
  title: z.string().trim().nonempty().max(50),
  note: z.string().trim().nonempty().max(200),
  type: z.enum(["food", "hotel", "transport", "photography", "other"]),
  onDate: z.number(),
  fromHours: z.number(),
  toHours: z.number(),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
});

export const planSchema = z.object({
  piggyBank: piggyBankSchema.optional(),
  budget: z.object({
    current: z.number().default(0),
    target: z.number().default(0),
  }),
  activities: z.array(activitySchema).optional(),
  destination: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().trim().nonempty(),
  }),
  members: z.array(z.string().trim().nonempty()).min(1).optional(),
  thumbnail: z.string().optional(),
  title: z.string().trim().nonempty().max(50),
  startDate: z.number(),
  endDate: z.number(),
});
