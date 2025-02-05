import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Link, router, Stack } from "expo-router";
import { Text, View } from "react-native";

export const unstable_settings = {
  initialRouteName: "full-view-map-activity",
  stack: {
    initialRouteName: "search",
  },
};

export default function SharedRouteHomeStack() {
  return (
    <Stack
      initialRouteName="full-view-map-activity"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="full-view-map-activity"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
