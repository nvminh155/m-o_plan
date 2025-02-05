import { planService } from "@/services/planService";
import { useQuery } from "@tanstack/react-query";

export const usePlanQuery = (id: string) => {
  const query = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      return await planService.getPlan(id);
    },
  });

  return query;
};
