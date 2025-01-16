import { IconAntd } from "@/components/icon";
import { Tabs } from "expo-router";



export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <IconAntd size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="design" />
      <Tabs.Screen name="map" />
    </Tabs>
  );
}
