import AppImage from "@/components/image/AppImage";
import AppText from "@/components/ui/AppText";
import React from "react";
import { View } from "react-native";

const PlanDetailHomeBanner = () => {
  return (
    <View className="relative h-[200px] items-center justify-center">
      <AppText
        containerClassName="self-center"
        className="font-medium !text-2xl self-center z-[2] !text-white"
      >
        title
      </AppText>
      <View className="absolute overlay w-full h-full bg-black/75 z-[1]"></View>
      <AppImage
        source={require("@/assets/images/test/16x9anime.png")}
        className="absolute w-full h-full top-0 left-0 z-0"
        style={{
          aspectRatio: 16 / 9,
        }}
      />
    </View>
  );
};

export default PlanDetailHomeBanner;
