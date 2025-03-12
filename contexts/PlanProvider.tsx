import { useLocalSearchParams } from "expo-router";
import React, { createContext } from "react";
import { TPlan } from "@/types/plan";
import { usePlanQuery } from "@/hooks/query/usePlanQuery";

type TPlanContext =
  | {
      data?: TPlan;
      id: string;
    }
  | undefined;

const PlanContext = createContext<TPlanContext>({
  id: "???"
});

interface PlanProviderProps extends React.PropsWithChildren<{}> {}
const PlanProvider = ({ children }: PlanProviderProps) => {
  const {
    id,
  }: {
    id: string;
  } = useLocalSearchParams();

  const query = usePlanQuery(id);

  const value = React.useMemo(() => ({ data: query.data?.data, id }), [query.data]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlanContext = () => {
  const context = React.useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};

export default PlanProvider;
