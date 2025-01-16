import { cn } from "@/lib/cn";
import { cssInterop } from "nativewind";
import React from "react";
import { Text, TextProps, View } from "react-native";

cssInterop(Text, {
  className: {
    target: "style",
  },
});

interface AppTextProps extends TextProps {
  text?: string;
  containerClassName?: string;
}

const AppText = ({
  text,
  children,
  className,
  containerClassName,
  ...rest
}: AppTextProps) => {
  return (
    <View className={cn("self-start", containerClassName)}>
      <Text className={`text-base text-color ${className}`} {...rest}>
        {text}
        {children}
      </Text>
    </View>
  );
};

export default AppText;
