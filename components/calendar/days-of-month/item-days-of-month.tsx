import { IconFontAwesome } from "@/components/icon";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/cn";
import React from "react";
import { Dimensions, View } from "react-native";

import AppButton from "@/components/stories/AppButton/AppButton";
import { paddingHorizontalWrapper } from "@/components/ui/Wrapper";

const screenWidth = Dimensions.get("window").width;

export const ITEM_WIDTH = (screenWidth - paddingHorizontalWrapper - 10 * 6) / 7;

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
        className="font-medium text-accent/60 self-center"
        containerClassName="rounded-full w-full self-center items-center justify-center flex-row aspect-square"
      >
        {item.name}
      </AppText>
      {item.day > 0 ? (
        <AppButton
          variant="primary"
          className={cn(
            "bg-gray-100 !rounded-full w-full justify-center items-center flex-row !px-0 !py-0",
            {
              "!bg-primary": isSelected ?? item.isToday,
            }
          )}
          style={{ aspectRatio: 1 }}
          onPress={() => {
            if (onPressCb) onPressCb(item);
          }}
        >
          <AppText
            className={cn("font-medium w-full", {
              "text-primary-foreground": isSelected ?? item.isToday,
            })}
            containerClassName="self-center"
          >
            {item.day}
          </AppText>
        </AppButton>
      ) : (
        <View className="pointer-events-none w-full" style={{ aspectRatio: 1 }}>
          <IconFontAwesome name="ban" className="!text-red-500" />
        </View>
      )}
    </View>
  );
};

export default ItemDaysOfMonth;
