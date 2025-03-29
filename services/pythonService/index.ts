import { http } from "@/lib/http";
import { TPlan } from "@/types/plan";

const BASE_URL = "http://192.168.190.108:8000";

export const pythonService = {
  buildTripWithAI: async (data: TPlan) => {
    return await http.post(
      `/buildTripWithAI`,
      {
        data_from_mobile: JSON.stringify(data),
      },
      {
        baseUrl: BASE_URL,
      }
    );
  },
};
