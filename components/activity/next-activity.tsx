import { Button, ButtonIcon } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/cn";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { BellOutLineIcon } from "@/components/ui/icon";
import MapScreen from "@/components/map";
import { TActivity } from "@/types/plan";
import ActivitySubtitle from "./activity-subtitle";
import ActivityProvider, {
  useActivityContext,
} from "@/contexts/ActivityProvider";

interface NextActivityProps {
  data: TActivity;
}

const NextActivity = ({ data }: NextActivityProps) => {
  return (
    <ActivityProvider data={data}>
      <View className="flex-1 mt-5 rounded-[30px]">
        <Image
          source={require("@/assets/images/3x4anime.jpg")}
          className="absolute w-full h-full z-[0] rounded-[30px] changeme"
          style={{
            aspectRatio: 3 / 4,
          }}
        />
        <View
          className="members flex-row bg-white rounded-[23px] p-0.5 mr-4 mt-4"
          style={{
            alignSelf: "flex-end",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index + 1} style={{ alignSelf: "flex-start" }}>
              <Image
                source={"https://picsum.photos/seed/696/3000/2000"}
                className={cn(
                  "h-10 w-10 rounded-full border-[1.5px] border-white",
                  {
                    "-ml-5": index !== 0,
                  }
                )}
              />
            </View>
          ))}
          <View className="bg justify-center items-center flex-row text-white rounded-full pr-2">
            <AppText containerClassName="self-center" className="font-medium">
              +2
            </AppText>
          </View>
        </View>

        <MapActivity />
      </View>
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