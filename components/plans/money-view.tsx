import React, { useState } from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";
import { Button, ButtonText } from "../ui/button";
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
          <AppText className="font-medium !text-tertiary-500">
            {view === "default" ? "Tiền hiện có" : "Mục tiêu"}
          </AppText>

          <Button
            variant="link"
            action="secondary"
            className="!bg-transparent items-center flex-row self-start !px-0 !py-0"
            onPress={() => {
              setView(view === "goal" ? "default" : "goal");
            }}
          >
            <IconAntd
              name="retweet"
              className="!text-typography-800"
              size={20}
            />
            <ButtonText className="font-medium">
              {view === "default" ? "Xem mục tiêu" : "Xem hiện tại"}
            </ButtonText>
          </Button>
        </View>
        <AppText className="!text-3xl font-medium">
          {view === "default" ? "25,000,000đ" : "35,000,000đ"}
        </AppText>
      </View>
      <ActionWithMoney />
    </View>
  );
};

const ActionWithMoney = () => {
  return (
    <View className="flex-row gap-4 items-center">
      <Button action="primary" className="rounded-full flex-1">
        <ButtonText className="!text-primary-foreground font-medium">
          Góp tiền
        </ButtonText>
      </Button>
      <Button action="secondary" className="flex-1 rounded-full">
        <ButtonText className="!text-secondary-foreground font-medium">
          Rút tiền
        </ButtonText>
      </Button>
    </View>
  );
};
export default MoneyView;
