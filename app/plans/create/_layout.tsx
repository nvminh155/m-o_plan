
import { Stack } from "expo-router";


export default function CreateLayout() {
  return (
  <Stack initialRouteName="onboarding-step1" screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="onboarding-step1" options={{
      headerShown: true,
      headerTitle: "Bước 1"
    }} />

<Stack.Screen name="onboarding-step2" options={{
      headerShown: true,
      headerTitle: "Bước 2"
    }} />


  </Stack>
  );
}
