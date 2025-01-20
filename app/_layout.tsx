import { Stack } from "expo-router";

import "./global.css";
import { cssInterop } from "nativewind";
import { Image } from "expo-image";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

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
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(home)" />
      </Stack>
    </ApplicationProvider>
  );
}
