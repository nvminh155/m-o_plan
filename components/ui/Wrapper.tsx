import { cn } from "@/lib/cn";
import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface WrapperProps extends SafeAreaViewProps {
  children?: React.ReactNode;
}

const Wrapper = ({ className, children, ...rest }: WrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        className={cn(`pt-3 bg-background flex-1 px-3`, className)}
        {...rest}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Wrapper;
