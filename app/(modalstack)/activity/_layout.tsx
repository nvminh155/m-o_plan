import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Link, router, Stack } from "expo-router";
import { Text, View } from "react-native";



export default function SharedRouteLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
