import { useAuthContext } from "@/contexts/AuthProvider";
import { Redirect } from "expo-router";
import React from "react";

const App = () => {
  const { user } = useAuthContext();

  if (!user) return <Redirect href={"/(auth)/login1"} />;

  return <Redirect href={"/plans"} />;
};

export default App;
