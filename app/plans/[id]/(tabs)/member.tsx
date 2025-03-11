import AppImage from "@/components/image/AppImage";
import PlanDetailHeader from "@/components/plans/id/home/header";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { CaretRightIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

interface CardInviteFriendProps {
  title: string;
  sourceImg: any;
}

const CardInviteFriend = ({ title, sourceImg }: CardInviteFriendProps) => {
  return (
    <VStack
      className="bg-white flex-1 rounded-xl shadow-black shadow-lg p-4"
      style={{
        boxShadow: "0px 20px 70px rgba(0,0,0,0.1)",
      }}
    >
      <Text className="font-medium text-[15px]">{title}</Text>
      <HStack className="justify-between items-center">
        <AppImage source={sourceImg} className="w-[70px] h-[70px] " />
        <Button className="h-10 w-10 rounded-full">
          <ButtonIcon as={CaretRightIcon} />
        </Button>
      </HStack>
    </VStack>
  );
};

const Member = () => {
  return (
    <VStack className="bg-[#f5f5f5] flex-1">
      <PlanDetailHeader />
      <HStack className="gap-4 mb-12 mt-4 px-4">
        <CardInviteFriend
          title="Mời bạn bè tham gia"
          sourceImg={require("@/assets/images/invite_friend.avif")}
        />
        <CardInviteFriend
          title="Link tham gia"
          sourceImg={require("@/assets/images/invite_link.png")}
        />
      </HStack>

      <VStack>
        <Text className="font-medium mb-4" size="lg">
          Danh sách thành viên (1)
        </Text>

        <HStack className="justify-between gap-4 bg-white p-4">
          <HStack className="gap-3">
            <AppImage
              source={require("@/assets/images/3x4anime.jpg")}
              className="w-16 h-16 rounded-full"
            />
            <VStack>
              <Text size={"sm"} className="text-gray-400">
                Người thành lập
              </Text>
              <Text className="font-semibold">Nguyen Van Minh</Text>
            </VStack>
          </HStack>

          <VStack className="gap-0.5 items-end">
            <Text size={"sm"} className="text-gray-400">
              Đã góp quỹ
            </Text>
            <Text className="font-semibold">{20000}đ</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Member;
