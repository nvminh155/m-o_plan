import { Button, ButtonIcon } from "@/components/ui/button";

import { VStack } from "@/components/ui/vstack";

import React from "react";

import { Text } from "@/components/ui/text";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import FormCreateActivity from "@/components/plans/create/form-create-activity";
import FormCreatePiggyBank from "@/components/plans/create/form-create-piggy-bank";
import FormStep1 from "@/components/plans/create/form-step1";
import FormCreateFriends from "@/components/plans/create/form-create-friend";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import { cn } from "@/lib/cn";

const PlanCreate = () => {
  const step = useCreatePlanStore((state) => state.stepString);
  const clearState = useCreatePlanStore((state) => state.clear);
  console.log("STEP", step);

  return (
    <VStack className="flex-1 rounded-md">
      <Button
        variant="link"
        size="xl"
        className="mr-auto"
        onPress={() => {
          router.back();
          clearState();
        }}
      >
        <ButtonIcon as={ArrowLeftIcon} className="!text-typography-500" />
      </Button>

      <Text bold className="text-center py-8">
        Bước {`${step.id}: ${step.title}`}
      </Text>

      <FormStep1 isShow={step.key.includes("base")} />

      <FormCreatePiggyBank isShow={step.key.includes("piggy-bank")} />

      {/* <FormCreateActivity /> */}

      <FormCreateActivity isShow={step.key.includes("activities")} />

      <FormCreateFriends isShow={step.key.includes("friends")} />

      <VStack className={cn({ hidden: !step.key.includes("done") })}>
        <Text>Hoàn thành</Text>
      </VStack>
    </VStack>
  );
};

export default PlanCreate;
