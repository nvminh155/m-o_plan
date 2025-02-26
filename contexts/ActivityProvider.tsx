import { TActivity } from "@/types/plan";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type TActivityContext = {
  data?: TActivity;
};
const ActivityContext = createContext<TActivityContext | undefined>(undefined);

interface ActivityProviderProps extends PropsWithChildren<{}> {
  data: TActivity;
}

const ActivityProvider = ({ children, data }: ActivityProviderProps) => {
  const value = useMemo(() => {
    return {
      data,
    };
  }, []);

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
