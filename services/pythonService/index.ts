import { env } from "@/config/env";
import { http } from "@/lib/http";
import { TPlan } from "@/types/plan";



export const pythonService = {
  buildTripWithAI: async (data: TPlan) => {
    return await http.post(
      `/buildTripWithAI`,
      {
        data_from_mobile: JSON.stringify(data),
      },
      {
        baseUrl: env.BASE_URL_PYTHON_SERVER,
      }
    );
  },
};
