import React, { useState } from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";
import AppButton from "../ui/AppButton";
import { IconAntd } from "../icon";

const MoneyView = () => {
  const [view, setView] = useState<"goal" | "default">("default");

  return (
    <View
      className="items-center gap-node bg-white p-8 rounded-xl -mt-12 z-[3]"
      style={{
        elevation: 5,
      }}
    >
      <View className="self-start justify-start">
        <View className="flex-row justify-between w-full">
          <AppText className="font-medium !text-accent/70">
            {view === "default" ? "Tiền hiện có" : "Mục tiêu"}
          </AppText>

          <AppButton
            className="!bg-transparent items-center flex-row self-start !px-0 !py-0"
            onPress={() => {
              setView(view === "goal" ? "default" : "goal");
            }}
          >
            <IconAntd name="retweet" className="!text-accent/70" size={20} />
            <AppText className="font-medium !text-accent/70">
              {view === "default" ? "Xem mục tiêu" : "Xem hiện tại"}
            </AppText>
          </AppButton>
        </View>
        <AppText className="!text-3xl font-medium">
          {view === "default" ? "25,000,000đ" : "35,000,000đ"}
        </AppText>
      </View>
      <View className="flex-row gap-4 items-center">
        <AppButton className="rounded-full flex-1">
          <AppText className="!text-primary-foreground font-medium">
            Góp tiền
          </AppText>
        </AppButton>
        <AppButton variant="secondary" className="flex-1 rounded-full">
          <AppText className="!text-secondary-foreground font-medium">
            Rút tiền
          </AppText>
        </AppButton>
      </View>
    </View>
  );
};

export default MoneyView;
