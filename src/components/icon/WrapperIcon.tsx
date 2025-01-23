import { cn } from "@/lib/cn";
import React from "react";
import { View } from "react-native";

interface WrapperIconProps
  extends React.PropsWithChildren<{
    className?: string;
  }> {}

const WrapperIcon = ({ className, children }: WrapperIconProps) => {
  return (
    <View
      className={cn(
        "flex-row justify-center h-full items-center self-center",
        className
      )}
    >
      {children}
    </View>
  );
};

export default WrapperIcon;
