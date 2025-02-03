import { TPlan } from "@/types/plan";
import { create } from "zustand";

const steps = [
  {
    id: 1,
    key: "base",
    isRequired: true,
    title: "Đặt tên và thời gian cho kế hoạch",
  },
  // {
  //   id: 1,
  //   key: "submit-base",
  //   isRequired: true,
  //   title: "Đặt tên cho kế hoạch của bạn",
  // },
  {
    id: 2,
    key: "piggy-bank",
    isRequired: true,
    title: "Tạo heo tiết kiệm cho kế hoạch này",
  },
  // {
  //   id: 2,
  //   key: "submit-piggy-bank",
  //   isRequired: true,
  //   title: "Tạo heo tiết kiệm cho kế hoạch này",
  // },
  {
    id: 3,
    key: "activities",
    isRequired: true,
    title: "Tạo các hoạt động cho kế hoạch này",
  },
  // {
  //   id: 3,
  //   key: "submit-activities",
  //   isRequired: true,
  //   title: "Tạo các hoạt động cho kế hoạch này",
  // },
  {
    id: 4,
    key: "friends",
    isRequired: true,
    title: "Bạn có muốn mời bạn bè tham gia cùng?",
  },
  // {
  //   id: 4,
  //   key: "submit-friends",
  //   isRequired: true,
  //   title: "Bạn có muốn mời bạn bè tham gia cùng?",
  // },

  {
    id: 5,
    key: "done",
    isRequired: false,
    title: "Hoàn tất",
  },
];

interface CreatePlanState {
  formData: TPlan;
  //
  // updateStep1: (data: TPlan["step1Schema"] | null) => void;
  // updatePiggyBank: (data: TPlan["piggyBank"] | null) => void;
  // updateActivities: (data: TPlan["activities"] | null) => void;
  // updateFriends: (data: TPlan["friends"] | null) => void;
  step: number;
  stepString: (typeof steps)[number];
  updateStep: (by: number) => void;
  updateFormData: (
    data:
      | TPlan["step1"]
      | TPlan["piggyBank"]
      | TPlan["activities"]
      | TPlan["friends"]
  ) => void;
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
    },
    activities: [],
    friends: [],
    thumbnail: "",
    step1: {
      title: "",
      startDate: 0,
      endDate: 0,
    },
  },

  step: 3,
  stepString: steps[3],
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  updateStep: (by) =>
    set((state) => ({
      step: guardStep(state.step + by),
      stepString: steps[guardStep(state.step + by)],
    })),

  clear: () => {
    set({
      formData: {
        piggyBank: {
          amountGoal: 0,
          amountPeriod: 0,
          periodDay: 1,
          endDate: 0,
        },
        activities: [],
        friends: [],
        thumbnail: "",
        step1: {
          title: "",
          startDate: 0,
          endDate: 0,
        },
      },
      step: 3,
      stepString: steps[3],
    });
  },
}));

export { useCreatePlanStore };
