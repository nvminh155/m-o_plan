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
  updateFormData: (data: Partial<PlanSchema>) => void;
}

const useCreatePlanStore = create<CreatePlanState>()((set) => ({
  formData: {
    budget: {
      target: 0,
      current: 0,
    },
    destination: {
      address: "",
      latitude: 0,
      longitude: 0,
      geo_id: "0",
      location_id: "0",
    },
    activities: [],
    members: [],
    thumbnail: "",
    title: "",
    startDate: 0,
    endDate: 0,
    type: "solo",
    numberOfMembers: 1,
  },

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
}));

export { useCreatePlanStore };
