import AppImage from "@/components/image/AppImage";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import {
  ArrowRightIcon,
  Icon,
  MinusIcon,
  PlusIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/lib/cn";
import { toDate } from "@/utils/convertTimestamp";
import React from "react";

type TActivityRecent = {
  id: string;
  type: "contribute" | "withdraw";
  userInfo: {
    avatar: string;
    fullName: string;
  };
  message: string;
  amount: string;
  timestamp: number;
};

const dataActivityRecent: TActivityRecent[] = [
  {
    id: "1",
    type: "contribute",
    userInfo: {
      avatar: "",
      fullName: "Nguyễn Văn Minh",
    },
    message: "Góp vào quỹ chung",
    amount: "20000", // vnd,
    timestamp: new Date().getTime(),
  },
  {
    id: "2",
    type: "withdraw",
    userInfo: {
      avatar: "",
      fullName: "Nguyễn Văn Minh",
    },
    message: "Rút quỹ chung",
    amount: "20000", // vnd,
    timestamp: new Date().getTime(),
  },
];

const CardActivityRecent = ({
  item,
  index,
}: {
  item: TActivityRecent;
  index: number;
}) => {
  return (
    <VStack
      className={cn("gap-3 bg-white p-4", {
        "bg-gray-200": index % 2 === 1,
      })}
    >
      <HStack className="justify-between">
        <HStack>
          <Icon
            as={item.type === "contribute" ? PlusIcon : MinusIcon}
            size="lg"
            className="!text-primary-500"
          />
          <Text className="font-medium text-primary-500" size="sm">
            {item.type === "withdraw" ? "Rút quỹ" : "Góp quỹ"}
          </Text>
        </HStack>
        <Text size="sm" className="text-gray-400">
          {toDate(item.timestamp)}
        </Text>
      </HStack>

      <HStack className="justify-between gap-4">
        <HStack className="gap-3">
          <AppImage
            source={require("@/assets/images/3x4anime.jpg")}
            className="w-16 h-16 rounded-full"
          />
          <VStack>
            <Text className="font-semibold">{item.userInfo.fullName}</Text>
            <Text
              size={"sm"}
              className="text-gray-400"
            >{`"${item.message}"`}</Text>
          </VStack>
        </HStack>

        <HStack className="gap-0.5">
          <Icon as={item.type === "contribute" ? PlusIcon : MinusIcon} />
          <Text className="font-semibold">{item.amount}đ</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

const PlanDetailRecentlyActivity = () => {
  return (
    <VStack className="mt-4">
      <Text className="font-semibold mb-4 px-4" size="lg">
        Hoạt động gần đây
      </Text>
      <VStack>
        {dataActivityRecent.map((item, index) => (
          <CardActivityRecent key={index + 1} item={item} index={index} />
        ))}
      </VStack>

      <Button
        className="bg-white rounded-none h-[4rem]"
        style={{
          elevation: 2,
        }}
      >
        <ButtonText className="text-primary-500">Xem tất cả</ButtonText>
        <ButtonIcon as={ArrowRightIcon} className="text-primary-500" />
      </Button>
    </VStack>
  );
};

export default PlanDetailRecentlyActivity;
