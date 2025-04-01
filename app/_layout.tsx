import { Navigator, Slot } from "expo-router";
import "./global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { StackRouter } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import AuthProvider from "@/contexts/AuthProvider";
import AppProvider from "@/contexts/AppProvider";
import { NotificationProvider } from "@/contexts/notification-context";

import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log("✅ Received a notification in the background!", {
      data,
      error,
      executionInfo,
    });
    // Do something with the notification data
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <AppProvider>
            <AuthProvider>
              <Navigator router={StackRouter} initialRouteName="plans">
                <SafeAreaView className={"flex-1 scroll_smooth"}>
                  <View className="flex-1">
                    <Slot />
                  </View>
                </SafeAreaView>
              </Navigator>
            </AuthProvider>
          </AppProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
