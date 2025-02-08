import { IconAntd } from "@/components/icon";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history"
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
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Lịch",
          tabBarIcon: ({ color }) => (
            <IconAntd size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Tin nhắn",
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: "Kế hoạch",
        }}
      />
    </Tabs>
  );
}
