import { Button, ButtonIcon } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/cn";
import { Image } from "expo-image";
import React from "react";
import { ImageBackground, View } from "react-native";
import { BellOutLineIcon, Icon, UserIcon } from "@/components/ui/icon";
import MapScreen from "@/components/map";
import { TActivity } from "@/types/plan";
import ActivitySubtitle from "./activity-subtitle";
import ActivityProvider, {
  useActivityContext,
} from "@/contexts/ActivityProvider";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import AppImage from "../image/AppImage";
import { HStack } from "../ui/hstack";
import { Heading } from "../ui/heading";

interface NextActivityProps {
  data: TActivity;
}

const NextActivity = ({ data }: NextActivityProps) => {
  return (
    <ActivityProvider data={data}>
      <VStack className="flex-1">
        <AppImage
          source={require("@/assets/images/banner_test.jpg")}
          className="absolute w-full h-full top-0 left-0"
        />
        <HStack className="bg-white absolute bottom-0 left-0">
          <VStack>
            <Heading size="sm">Hoạt động mới</Heading>
            <HStack className="gap-2">
              <Icon as={UserIcon} />
              <Text>2 người</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </ActivityProvider>
  );
};

// interface MapActivityProps {}

const MapActivity = () => {
  const { data } = useActivityContext();

  return (
    <View className="flex-1 max-h-[70%] p-4 mt-auto">
      <View className="flex-1 p-2 rounded-[23px] bg-white relative">
        <View className="pl-3 pb-3 flex-row items-center justify-between">
          <View>
            <AppText className="font-medium text-lg">{data?.title}</AppText>

            <ActivitySubtitle />
          </View>
          <Button
            action="secondary"
            size="lg"
            className="!p-0 h-[3rem] w-[3rem] mr-3 rounded-full"
          >
            <ButtonIcon as={BellOutLineIcon} />
          </Button>
        </View>

        <MapScreen
          markers={[
            {
              coordinate: { latitude: 10.9996864, longitude: 106.6782293 },
              title: "Điểm đến",
              //changeme
            },
          ]}
          className="rounded-[19px] overflow-hidden relative"
        />
      </View>
    </View>
  );
};

export default NextActivity;
