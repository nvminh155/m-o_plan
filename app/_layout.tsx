import { Stack } from "expo-router";

import "./global.css";
import { cssInterop } from "nativewind";
import { Image } from "expo-image";

cssInterop(Image, {
  className: {
    target: "style",
  },
});
export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown:false
    }}
    initialRouteName="(tabs)"
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}
