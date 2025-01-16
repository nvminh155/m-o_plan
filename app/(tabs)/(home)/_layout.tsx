import { Stack } from "expo-router";

import { cssInterop } from "nativewind";
import { Image } from "expo-image";


cssInterop(Image, {
  className: {
    target: "style",
  },
})
export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
