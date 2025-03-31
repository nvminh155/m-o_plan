import { Tabs, useRouter } from "expo-router";
import React from "react";

import {
  ArrowLeftIcon,
  HomeIcon,
  Icon,
  MemberFilledIcon,
} from "@/components/ui/icon";
import AppImage from "@/components/image/AppImage";
import { Button, ButtonIcon } from "@/components/ui/button";
import { View } from "react-native";

const PlansTabsLayout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: 700,
          fontSize: 11,
        },
        tabBarActiveTintColor: "#F7653D",
        headerBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: "white", // Change to your preferred color
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 6, // For Android shadow
              position: "relative",
            }}
          >
            <AppImage
              source={require("@/assets/images/banner_header_route.png")}
              className="w-full h-full absolute top-0 left-0"
              style={{
                aspectRatio: 16 / 9,
              }}
            />
          </View>
        ),
        headerShadowVisible: false,
        headerBackgroundContainerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          fontSize: 16,
        },
        headerLeft: () => {
          return (
            <Button
              size="xl"
              action="primary"
              className="rounded-full z-10 bg-transparent border-none border-0"
              onPress={() => {
                router.back();
              }}
            >
              <ButtonIcon as={ArrowLeftIcon} className="text-typography-600" />
            </Button>
          );
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hoạt động",
          tabBarIcon: ({ color }) => (
            <Icon
              as={HomeIcon}
              style={{
                color: color,
              }}
              className="w-full h-full"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="view-on-map"
        options={{
          title: "Bản đồ",
          tabBarIcon: ({ color }) => (
            <Icon
              as={MemberFilledIcon}
              style={{
                color: color,
              }}
              className="w-full h-full"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="build-with-ai"
        options={{
          title: "Bắt đầu",
          tabBarIcon: ({ color }) => (
            <Icon
              as={MemberFilledIcon}
              style={{
                color: color,
              }}
              className="w-full h-full"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default PlansTabsLayout;
