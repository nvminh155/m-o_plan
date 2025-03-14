import { PlanSchema } from "@/types/plan";
import { create } from "zustand";

const steps = [
  {
    id: 1,
    key: "base",
    isRequired: true,
    title: "Đặt tên và thời gian cho kế hoạch",
  },
  {
    id: 2,
    key: "piggy-bank",
    isRequired: true,
    title: "Tạo heo tiết kiệm cho kế hoạch này",
  },
  {
    id: 3,
    key: "activities",
    isRequired: true,
    title: "Tạo các hoạt động cho kế hoạch này",
  },
  {
    id: 4,
    key: "members",
    isRequired: true,
    title: "Bạn có muốn mời bạn bè tham gia cùng?",
  },

  {
    id: 5,
    key: "done",
    isRequired: false,
    title: "Hoàn tất",
  },
];

interface CreatePlanState {
  formData: PlanSchema;
  step: number;
  stepString: (typeof steps)[number];
  updateStep: (by: number) => void;
  updateFormData: (data: Partial<PlanSchema>) => void;
  goTo: (step: number) => void;
  clear: () => void;
}

const guardStep = (step: number) =>
  Math.min(Math.max(step, 0), steps.length - 1);

const useCreatePlanStore = create<CreatePlanState>()((set) => ({
  formData: {
    piggyBank: {
      amountGoal: 0,
      amountPeriod: 0,
      periodDay: 1,
      endDate: 0,
      currentMoney: 0,
    },
    budget: {
      target: 0,
      current: 0,
    },
    destination: {
      address: "",
      latitude: 0,
      longitude: 0,
    },
    activities: [],
    members: [],
    thumbnail: "",
    title: "",
    startDate: 0,
    endDate: 0,
  },

  step: 0,
  stepString: steps[0],
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  updateStep: (by) =>
    set((state) => ({
      step: guardStep(state.step + by),
      stepString: steps[guardStep(state.step + by)],
    })),

  goTo: (step) =>
    set({
      step,
      stepString: steps[step],
    }),

  clear: () => {
    set({
      formData: {
        piggyBank: {
          amountGoal: 0,
          amountPeriod: 0,
          periodDay: 1,
          currentMoney: 0,
          endDate: 0,
        },
        budget: {
          target: 0,
          current: 0,
        },
        destination: {
          address: "",
          latitude: 0,
          longitude: 0,
        },
        activities: [],
        members: [],
        thumbnail: "",

        title: "",
        startDate: 0,
        endDate: 0,
      },
      step: 0,
      stepString: steps[0],
    });
  },
}));

export { useCreatePlanStore };
