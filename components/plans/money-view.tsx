import React, { useState } from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { IconAntd } from "../icon";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { SwitchLightIcon } from "../ui/icon";
import { TPlan } from "@/types/plan";

interface MoneyViewProps {
  piggyBank: TPlan["piggyBank"];
}

const MoneyView = ({ piggyBank }: MoneyViewProps) => {
  const [view, setView] = useState<"goal" | "default">("default");

  return (
    <View
      className="items-center bg-white p-8 rounded-xl -mt-24 z-[3]"
      style={{
        elevation: 5,
      }}
    >
      <View className="self-start justify-start">
        <HStack className="justify-between w-full items-center">
          <Text className="font-medium !text-tertiary-500">
            {view === "default" ? "Tiền hiện có" : "Mục tiêu"}
          </Text>

          <Button
            variant="link"
            action="secondary"
            onPress={() => {
              setView(view === "goal" ? "default" : "goal");
            }}
          >
            <ButtonIcon as={SwitchLightIcon} size="xl" />
            <ButtonText className="font-medium">
              {view === "default" ? "Xem mục tiêu" : "Xem hiện tại"}
            </ButtonText>
          </Button>
        </HStack>
        <AppText className="!text-3xl font-medium">
          {view === "default"
            ? `${piggyBank?.currentMoney}đ`
            : `${piggyBank?.amountGoal}đ`}
        </AppText>
      </View>
      <ActionWithMoney />
    </View>
  );
};

const ActionWithMoney = () => {
  return (
    <View className="flex-row gap-4 items-center mt-node">
      <Button action="primary" className="rounded-full flex-1">
        <ButtonText className="!text-primary-foreground font-medium">
          Góp tiền
        </ButtonText>
      </Button>
      <Button
        action="primary"
        variant="outline"
        className="flex-1 rounded-full"
      >
        <ButtonText className="!text-secondary-foreground font-medium">
          Rút tiền
        </ButtonText>
      </Button>
    </View>
  );
};
export default MoneyView;
