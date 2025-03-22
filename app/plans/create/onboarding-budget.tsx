import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePlanStore } from "@/stores/create-plans-store";

import { planSchema } from "@/schemas/planSchema";
import { useRouter } from "expo-router";

import { SearchBar } from "@/components/map/search-bar";
import { Heading } from "@/components/ui/heading";
import { CreatePlanHeader } from "./_layout";
import FormInput from "@/components/ui/form-control/form-input";
import { Modal, ModalBody, ModalContent } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

const formSchema = planSchema.pick({
  budget: true,
});
type TForm = z.infer<typeof formSchema>;
const OnboardingBudget = () => {
  const router = useRouter();

  const updateFormData = useCreatePlanStore((state) => state.updateFormData);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: {
        current: 0,
        target: 0,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: TForm) => {
    updateFormData(data);
    // setLoading(true);
    router.push("/plans/create/status");
  };

  return (
    <VStack className="flex-1 gap-4 mt-auto">
      <CreatePlanHeader
        onPressCB={() => {
          form.handleSubmit(onSubmit)();
        }}
      />
{/*       
      <Modal isOpen={loading} onClose={() => setLoading(false)}>
        <ModalContent>
          <ModalBody>
            <VStack className="flex-1 justify-center items-center">
              <Spinner />
              <Heading size="lg">Đang xử lý...</Heading>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal> */}

      <Heading className="mx-auto" size="lg">
        Ngân sách cho chuyến đi
      </Heading>

      <FormInput
        control={form.control}
        name="budget.target"
        keyboardType="number-pad"
      />
    </VStack>
  );
};

export default OnboardingBudget;
