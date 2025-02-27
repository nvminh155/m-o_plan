import { db } from "@/firebaseConfig";
import { TPlan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useActivityByUserIdQuery = (
  userId: string,
  currentDateTimestamp: number
) => {
  const date = new Date(currentDateTimestamp);

  const ref = collection(db, "/plans");
  const queryFirebase = query(ref, where("members", "array-contains", userId));

  const query1 = useQuery({
    queryKey: ["plan", userId, currentDateTimestamp],
    queryFn: async () => {
      const res = await getDocs(queryFirebase);

      const data = res.docs
        .map((doc) => {
          return {
            ...doc.data(),
            activities: (doc.data() as TPlan).activities.filter((activity) => {
              const startDate = new Date(activity.startDate);
              const endDate = new Date(activity.endDate);

              const dateStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
              const dateEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
              
              // console.log('date start', dateStart, dateStart.getTime())
              //   console.log('date end', dateEnd, dateEnd.getTime())
              // console.log(date.getTime() >= dateStart.getTime(), date.getTime() <= dateEnd.getTime())

              if (date.getTime() >= dateStart.getTime() && date.getTime() <= dateEnd.getTime()) return true;

              return false;
            }),
          };
        })
        .map((plan) => plan.activities).flat();

      return data;
    },
  });

  return query1;
};
