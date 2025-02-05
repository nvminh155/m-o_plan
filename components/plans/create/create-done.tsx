import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/lib/cn";
import { planService } from "@/services/planService";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface CreateDoneScreenProps {
  isShow?: boolean;
}

const PendingScreen = () => {
  return (
    <VStack>
      <Text>Đang tạo kế hoạch</Text>
    </VStack>
  );
};

const CreateDoneScreen = ({ isShow }: CreateDoneScreenProps) => {
  const updateStep = useCreatePlanStore((state) => state.updateStep);
  const clearState = useCreatePlanStore((state) => state.clear);
  const formData = useCreatePlanStore((state) => state.formData);

  const mutation = useMutation({
    mutationFn: planService.createPlan,
    onSuccess(data) {
      console.log("SUCCESS CREATE PLAN", data);
    },
    onError(error) {
      console.log("ERROR CREATE PLAN", error);
      updateStep(-1);
    },
  });

  useEffect(() => {
    mutation.mutate(formData);
  }, []);
  console.log("MUTATION", mutation.isIdle, mutation.isPending, mutation.isSuccess);
  return (
    <VStack className={cn({ hidden: !isShow })}>
      {mutation.isIdle || mutation.isPending && <PendingScreen />}
      {mutation.isSuccess && <Text>Hoàn thành</Text>}
    </VStack>
  );
};

export default CreateDoneScreen;
