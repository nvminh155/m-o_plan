import { VStack } from "@/components/ui/vstack";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import FormDateTimePicker from "@/components/ui/form-control/form-datetime-picker";

import { planSchema } from "@/schemas/planSchema";
import { useRouter } from "expo-router";

import { CreatePlanHeader } from "./_layout";

const formSchema = planSchema.pick({
  startDate: true,
  endDate: true,
});
type TForm = z.infer<typeof formSchema>;

const OnboardingDateRange = () => {
  const router = useRouter();

  const updateFormData = useCreatePlanStore((state) => state.updateFormData);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
    },
  });

  const onSubmit = (data: TForm) => {
    console.log("MY DATA CREA PLAN", data);
    updateFormData(data);
    router.push("/plans/create/onboarding-kind-of-trip");
  };

  return (
    <VStack className="flex-1 gap-4">
      <CreatePlanHeader
        onPressCB={() => {
          form.handleSubmit(onSubmit)();
        }}
      />
      <FormDateTimePicker
        control={form.control}
        name="startDate"
        formLabelProps={{
          text: "Ngày bắt đầu",
        }}
      />
      <FormDateTimePicker
        control={form.control}
        name="endDate"
        formLabelProps={{
          text: "Ngày kết thúc",
        }}
      />
    </VStack>
  );
};

export default OnboardingDateRange;
