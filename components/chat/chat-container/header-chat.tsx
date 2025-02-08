import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { BarOutlineIcon } from "@/components/ui/icon/custom";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import React from "react";

// cho 6 thanh vien se thay bang onlien hay khong neu nhan tin voi friend
interface HeaderChatProps {
  typeRoom?: "group" | "user";
}

const HeaderChat = ({ typeRoom = "group" }: HeaderChatProps) => {
  return (
    <LinearGradient
      className="w-full items-center py-2"
      colors={["#a1ffce", "#faffd1"]}
      start={[0, 1]}
      end={[1, 0]}
    >
      <HStack className="justify-between w-full px-4">
        <HStack space="lg">
          <Button
            action="default"
            onPress={() => {
              router.canGoBack();
              router.back();
            }}
          >
            <ButtonIcon as={ArrowLeftIcon} />
          </Button>

          <VStack>
            <Text bold>E-Learning Collab</Text>
            <Text size="sm" className="text-typography-500/80">
              {typeRoom === "group" ? "6 thành viên" : "Đang hoạt động"}
            </Text>
          </VStack>
        </HStack>

        <HStack>
          <Button action="default">
            <ButtonIcon as={BarOutlineIcon} />
          </Button>
        </HStack>
      </HStack>
    </LinearGradient>
  );
};

export default HeaderChat;
