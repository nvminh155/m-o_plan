import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "full-view-map-activity",
  stack: {
    initialRouteName: "search",
  },
};


export default function SharedRouteHomeStack() {
  return (
    <Stack initialRouteName="full-view-map-activity" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="full-view-map-activity"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Toàn bản đồ"
        }}
      />
    </Stack>
  );
}
