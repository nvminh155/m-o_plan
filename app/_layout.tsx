import { Navigator, Slot, Stack } from "expo-router";
import "./global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { cssInterop } from "nativewind";
import { Image } from "expo-image";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { StackRouter } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

cssInterop(Image, {
  className: {
    target: "style",
  },
});

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <Navigator router={StackRouter} initialRouteName="plans">
          <SafeAreaView className={"flex-1 !bg-red-500"}>
            <View className="flex-1 !bg-red-500">
              <Slot />
            </View>
          </SafeAreaView>
        </Navigator>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
