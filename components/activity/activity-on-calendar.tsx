import { IconAntd } from "@/components/icon";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/cn";
import { Image } from "expo-image";
import React, { useState } from "react";
import { View } from "react-native";
import ActivityProvider from "@/contexts/ActivityProvider";
import { ClockLightIcon, CloseIcon, Icon, MapIcon } from "../ui/icon";

import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import MapScreen from "../map";
import { TActivity } from "@/types/plan";

interface ActivityOnCalendarProps {
  data: TActivity;
}
const ActivityOnCalendar = ({ data }: ActivityOnCalendarProps) => {
  const [isShowMap, setIsShowMap] = useState(false);

  return (
    <ActivityProvider data={data}>
      <VStack
        className={cn(
          "relative flex-1 max-h-[200px] bg-secondary-500 rounded-[20px] p-3 gap-3",
          {
            "h-[600px] max-h-[300px]": isShowMap,
          }
        )}
      >
        <HStack
          className={cn(
            "relative max-h-[100px] bg-secondary-500 rounded-[20px] p-3 gap-3"
          )}
        >
          <Image
            source={require("@/assets/images/3x4anime.jpg")}
            className={cn("rounded-[15px] h-full")}
            style={{
              aspectRatio: 1,
              objectFit: "cover",
            }}
          />

          <View className="flex-1">
            <AppText className={cn("font-medium text-base line-clamp-1")}>
              {data.title}
            </AppText>

            <SubTitle />

            <View
              className="members flex-row items-center rounded-[23px] p-0.5 mt-auto"
              style={{
                alignSelf: "flex-start",
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <View key={index + 1} style={{ alignSelf: "flex-start" }}>
                  <Image
                    source={"https://picsum.photos/seed/696/3000/2000"}
                    className={cn(
                      "h-8 w-8 rounded-full border-[1.5px] border-white",
                      {
                        "-ml-3": index !== 0,
                      }
                    )}
                  />
                </View>
              ))}
              <View className="bg justify-center items-center flex-row text-white rounded-full pr-2 ml-2">
                <AppText
                  containerClassName="self-center"
                  className={cn("font-medium")}
                >
                  +2
                </AppText>
              </View>
            </View>
          </View>
        </HStack>

        {isShowMap && (
          <MapScreen
            markers={[
              {
                coordinate: {
                  latitude: 20.9797657,
                  longitude: 108.6750724,
                },
                title: "Traveling to S", // changeme
              },
            ]}
            className="rounded-[20px] overflow-hidden"
          />
        )}

        <Button
          action="secondary"
          className={cn("rounded-full")}
          onPress={() => {
            setIsShowMap(!isShowMap);
          }}
          size="sm"
        >
          <ButtonIcon
            as={isShowMap ? CloseIcon : MapIcon}
            className="!text-typography-600"
          />
          <ButtonText>{isShowMap ? "Đóng bản đồ" : "Xem bản đồ"}</ButtonText>
        </Button>
      </VStack>
    </ActivityProvider>
  );
};

const SubTitle = () => {
  return (
    <VStack className={cn("subtitle gap-2 mt-1")}>
      <HStack>
        <IconAntd
          name="calendar"
          className={cn("!text-typography-600")}
          size={15}
        />
        <AppText className={cn("text-xs !text-typography-600")}>
          11 Nov - 16 Nov
        </AppText>
      </HStack>
      <HStack>
        <Icon as={ClockLightIcon} className="!text-typography-600" />
        <AppText className={cn("!text-typography-600  text-xs")}>
          Tomorrow
        </AppText>
      </HStack>
    </VStack>
  );
};

export default ActivityOnCalendar;
