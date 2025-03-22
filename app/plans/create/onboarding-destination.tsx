import { VStack } from "@/components/ui/vstack";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePlanStore } from "@/stores/create-plans-store";

import { planSchema } from "@/schemas/planSchema";
import { useRouter } from "expo-router";

import { SearchBar } from "@/components/map/search-bar";
import { Heading } from "@/components/ui/heading";
import { CreatePlanHeader } from "./_layout";

const formSchema = planSchema.pick({
  destination: true,
});
type TForm = z.infer<typeof formSchema>;
const OnboardingDestination = () => {
  const router = useRouter();

  const updateFormData = useCreatePlanStore((state) => state.updateFormData);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: {
        latitude: 10.3339468,
        longitude: 107.0830519,
        address: "Công Viên Cột Cờ, Vũng Tàu, Việt Nam",
      },
    },
  });

  const onSubmit = (data: TForm) => {
    console.log("MY DATA CREA PLAN", data);
    updateFormData(data);
    router.push("/plans/create/onboarding-date-range");
  };

  return (
    <VStack className="flex-1 gap-4 mt-auto">
      <CreatePlanHeader
        onPressCB={() => {
          form.handleSubmit(onSubmit)();
        }}
      />

      <Heading className="mx-auto" size="lg">
        Bạn muốn đến đâu?
      </Heading>

      <SearchBar
        onSelected={(e) => {
          form.setValue("destination", {
            latitude: e.latitude,
            longitude: e.longitude,
            address: e.address,
            geo_id: e.geo_id ?? "",
            location_id: e.location_id ?? "",
          });

          form.handleSubmit(onSubmit)();
        }}
      />
    </VStack>
  );
};

export default OnboardingDestination;
