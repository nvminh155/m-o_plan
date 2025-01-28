import Wrapper from "@/components/ui/Wrapper";
import { StackRouter } from "@react-navigation/native";
import { Navigator, Slot,  } from "expo-router";
import React from "react";

const PlansLayout = () => {
  return (
    <Navigator router={StackRouter}>
      
      <Wrapper className="bg-white">
        <Slot />
      </Wrapper>
    </Navigator>
  );
};

export default PlansLayout;
