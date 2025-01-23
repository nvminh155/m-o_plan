import { Stack } from "expo-router";
import "./global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { cssInterop } from "nativewind";
import { Image } from "expo-image";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

cssInterop(Image, {
  className: {
    target: "style",
  },
});

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(home)" />
      </Stack>
    </GluestackUIProvider>
  );
}
