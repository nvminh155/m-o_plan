import { IconFontAwesome } from "@/components/icon";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/cn";
import React from "react";
import { Dimensions, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { paddingHorizontalWrapper } from "@/components/ui/Wrapper";

const screenWidth = Dimensions.get("window").width;

export const ITEM_WIDTH = (screenWidth - paddingHorizontalWrapper - 20 * 6) / 7;

type TItem = {
  name: string;
  day: number;
  isToday: boolean;
};

interface ItemDaysOfMonthProps {
  item: TItem;
  isSelected?: boolean | null;
  onPressCb?: (item: TItem) => void;
}

const ItemDaysOfMonth = ({
  item,
  isSelected,
  onPressCb,
}: ItemDaysOfMonthProps) => {
  return (
    <View
      style={{ width: ITEM_WIDTH }}
      className="flex-col items-center justify-center"
    >
      <AppText
        className="font-medium text-tertiary-500 self-center"
        containerClassName="rounded-full w-full self-center items-center justify-center flex-row aspect-square"
      >
        {item.name}
      </AppText>
      {item.day > 0 ? (
        <Button
          action={isSelected ?? item.isToday ? "primary" : "secondary"}
          className={cn("!rounded-full flex-1 !px-0 !py-0")}
          style={{ aspectRatio: 1 }}
          onPress={() => {
            if (onPressCb) onPressCb(item);
          }}
        >
          <ButtonText className={cn("font-medium")}>{item.day}</ButtonText>
        </Button>
      ) : (
        <View className="pointer-events-none w-full" style={{ aspectRatio: 1 }}>
          <IconFontAwesome name="ban" className="!text-red-500" />
        </View>
      )}
    </View>
  );
};

export default ItemDaysOfMonth;
