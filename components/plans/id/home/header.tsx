import AppImage from "@/components/image/AppImage";
import Affix from "@/components/ui/affix";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import React from "react";

const PlanDetailHeader = () => {
  const router = useRouter();

  return (
    <Affix>
      <HStack
        className="w-full h-16 bg-white px-4 shadow-black shadow-lg"
        style={{
          boxShadow: "0px 20px 70px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          size="xl"
          action="primary"
          className="rounded-full z-10 bg-transparent border-none border-0"
          onPress={() => {
            console.log("back");
            router.back();
          }}
        >
          <ButtonIcon as={ArrowLeftIcon} className="text-typography-600" />
        </Button>
        <AppImage
          source={require("@/assets/images/banner_header_route.png")}
          className="absolute top-0 left-0 h-full w-full"
          style={{
            aspectRatio: 16 / 9,
          }}
        />
      </HStack>
    </Affix>
  );
};

export default PlanDetailHeader;
