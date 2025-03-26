import { useAuthContext } from "@/contexts/AuthProvider";
import { Redirect } from "expo-router";
import React from "react";

const App = () => {
  const { user } = useAuthContext();

  if (!user) return <Redirect href={"/(auth)/login1"} />;

  return (
    <Redirect
      href={{
        pathname: "/plans/[id]/schedule",
        params: { id: "b725bc6e-11de-4b67-8096-f319ece1ce56" },
      }}
    />
  );
};

export default App;
