import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { MessageCircleIcon, ScheduleIcon } from "@/components/ui/icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const PlanDetailMoreAction = () => {
  const router = useRouter();
  const { id }: { id: string } = useLocalSearchParams();

  return (
    <ButtonGroup
      className="mt-4 bg-white py-8 px-4 justify-between items-center"
      flexDirection="row"
      style={{
        elevation: 1,
      }}
    >
      <Button action="default" className="flex-col h-auto">
        <ButtonIcon className="text-primary-500" as={MessageCircleIcon} />
        <ButtonText className="text-typography-500 font-medium">
          Tin nhắn
        </ButtonText>
      </Button>

      <Button
        action="default"
        className="flex-col h-auto"
        onPress={() => {
          router.push({
            pathname: "/plans/[id]/schedule",
            params: { id },
          });
        }}
      >
        <ButtonIcon className="text-primary-500" as={ScheduleIcon} />
        <ButtonText className="text-typography-500 font-medium">
          Lịch trình
        </ButtonText>
      </Button>

      <Button action="default" className="flex-col h-auto">
        <ButtonIcon className="text-primary-500" as={ScheduleIcon} />
        <ButtonText className="text-typography-500 font-medium">
          Lịch trình
        </ButtonText>
      </Button>
    </ButtonGroup>
  );
};

export default PlanDetailMoreAction;
