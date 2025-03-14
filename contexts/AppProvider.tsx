import { auth, db } from "@/firebaseConfig";
import { useLocation } from "@/hooks/useLocation";
import { TUser } from "@/types/user";
import { LocationObject } from "expo-location";
import { router } from "expo-router";
import React, { useMemo } from "react";

type TAppContext = {
  location: LocationObject | null;
};

const AppContext = React.createContext<TAppContext>({
  location: null,
});

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const { myLocation } = useLocation();

  const value = useMemo(() => {
    return {
      location: myLocation,
    };
  }, [myLocation]);

  console.log(value);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context
};

export default AppProvider;
