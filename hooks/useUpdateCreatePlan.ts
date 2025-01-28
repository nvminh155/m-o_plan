import { useCreatePlanStore } from "@/stores/create-plans-store";
import { useEffect } from "react";

export const useUpdateCreatePlan = (yourKey: string, action: () => void) => {
  const stepString = useCreatePlanStore((state) => state.stepString);
  console.log(stepString.key)
  useEffect(() => {
    if (
      stepString.key.includes(yourKey) &&
      stepString.key.startsWith("submit")
    ) {

      console.log("ACTION NOW")
      action();
    }
  }, [stepString.key]);
};
