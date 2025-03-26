import { db } from "@/firebaseConfig";
import { planService } from "@/services/planService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const usePlanQuery = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      return await planService.getPlan(id);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `plans/${id}`), (snapshot) => {
      console.log("Plan updated:");
      // queryClient.invalidateQueries({
      //   queryKey: ["plan", id],
      // });
      queryClient.setQueryData(["plan", id], {
        ref: snapshot.ref,
        data: snapshot.data(),
      });
    });

    return () => unsubscribe();
  }, [id]);
  // console.log("query", query);
  return query;
};
