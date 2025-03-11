import React, { useState } from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { PlusIcon, PlusThinIcon, SwitchLightIcon, WithDrawalIcon } from "../ui/icon";
import { TPlan } from "@/types/plan";
import { VStack } from "../ui/vstack";

interface MoneyViewProps {
  piggyBank: TPlan["piggyBank"];
}

const MoneyView = ({ piggyBank }: MoneyViewProps) => {
  const [view, setView] = useState<"goal" | "default">("default");

  return (
    <VStack
      className="items-center bg-white p-8 rounded-xl -mt-24 z-[3]"
      style={{
        elevation: 5,
      }}
    >
      <Text size="xl" className="font-semibold mb-3">
        Chuyến đi của thanh xuân
      </Text>
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
        <Text className="!text-3xl font-medium">
          {view === "default"
            ? `${piggyBank?.currentMoney}đ`
            : `${piggyBank?.amountGoal}đ`}
        </Text>
      </View>
      <ActionWithMoney />
    </VStack>
  );
};

const ActionWithMoney = () => {
  return (
    <View className="flex-row gap-4 items-center mt-node">
      <Button action="primary" variant="ghost" className="rounded-full flex-1">
        <ButtonIcon as={PlusIcon} />
        <ButtonText className="!text-primary-foreground font-semibold">
          Góp quỹ
        </ButtonText>
      </Button>
      <Button action="primary" variant="ghost" className="flex-1 rounded-full">
        <ButtonIcon as={WithDrawalIcon} />
        <ButtonText className="!text-primary-foreground font-semibold">
          Rút quỹ
        </ButtonText>
      </Button>
    </View>
  );
};
export default MoneyView;
