import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import React from "react";

interface ButtonNextStepProps {
  disabled?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

const ButtonNextStep = ({
  disabled,
  onNext,
  onPrevious,
}: ButtonNextStepProps) => {
  const step = useCreatePlanStore((state) => state.step);
  const updateStep = useCreatePlanStore((state) => state.updateStep);

  return (
    <ButtonGroup flexDirection="row" className=" mt-auto ml-auto mb-4">
      <Button
        action="secondary"
        className={cn("w-fit self-end", { hidden: step === 0 })}
        size="sm"
        onPress={() => {
          if (onPrevious) onPrevious();
          updateStep(-1);
        }}
      >
        <ButtonText>Trở lại</ButtonText>
      </Button>
      <Button
        className="w-fit self-end"
        size="sm"
        onPress={() => {
          if (step === 7) {
            console.log("CREATE PLAN");
          } else if (onNext) {
            onNext();
          }
        }}
        disabled={disabled}
      >
        <ButtonText>{step === 3 ? "Hoàn thành" : "Bước tiếp theo"}</ButtonText>
      </Button>
    </ButtonGroup>
  );
};

export default ButtonNextStep;
