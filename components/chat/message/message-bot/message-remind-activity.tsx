import AppImage from "@/components/image/AppImage";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icon";
import { BarOutlineIcon } from "@/components/ui/icon/custom";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

interface MessageRemindActivityProps {
  botInfo: {
    avatar?: string;
    fullName: string;
  };
  activityInfo: {
    title: string;
    timeToStart: number;
    note: string;
  };
}

const MessageRemindActivity = ({
  botInfo,
  activityInfo,
}: MessageRemindActivityProps) => {
  return (
    <VStack className="items-center w-full" space="md">
      <HStack space="md">
        <AppImage
          source={require("@/assets/images/3x4anime.jpg")}
          className="w-16 h-full rounded-full"
          style={{ aspectRatio: 1 }}
        />
        <VStack>
          <Text bold>Bot At Group</Text>
          <Text size="sm" className="text-typography-500/70">
            Gửi lúc 12:49
          </Text>
        </VStack>
      </HStack>

      <VStack>
        <Text>
          Chúng ta có một hoạt động{" "}
          <Text className="text-primary-500" bold>
            "tên của hoạt động"
          </Text>{" "}
          vào lúc{" "}
          <Text className="text-primary-500" bold>
            16:00 PM
          </Text>
          .
          <Text>
            Hãy xem{" "}
            <Text
              className="text-primary-500"
              bold
              onPress={() => {
                console.log("click xem ghi chu");
              }}
            >
              ghi chú{" "}
            </Text>
            để chuẩn bị hoặc{" "}
            <Text
              className="text-primary-500"
              bold
              onPress={() => {
                console.log("click xem chi tiet hoat dong");
              }}
            >
              xem chi tiết hoạt động{" "}
            </Text>
            !
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
};

export default MessageRemindActivity;
