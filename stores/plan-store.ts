import { TPlan } from "@/types/plan";
import { create } from "zustand";

interface CreatePlanState {
  data?: TPlan;
  setData: (data: TPlan) => void;
}

const usePlanStore = create<CreatePlanState>()((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));

export { usePlanStore };
