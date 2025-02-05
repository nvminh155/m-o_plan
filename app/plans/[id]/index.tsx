import { IconAntd } from "@/components/icon";
import AppImage from "@/components/image/AppImage";
import MoneyView from "@/components/plans/money-view";
import { Button, ButtonText } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import Tabs, { TabsContent, TRenderInfoItem } from "@/components/ui/tabs";
import { cn } from "../../../lib/cn";
import React from "react";
import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePlanQuery } from "@/hooks/query/usePlanQuery";
import { usePlanContext } from "@/contexts/PlanProvider";
import Loading from "@/components/ui/loading";

const itemsTab = [
  {
    key: "Today",
    label: "Hôm nay",
  },
  {
    key: "History",
    label: "Lịch sử",
  },
];

const DetailPlans = () => {
  const { data } = usePlanContext();

  const renderTabTrigger = ({
    item,
    activeTab,
    onPressCB,
  }: TRenderInfoItem) => {
    return (
      <Button
        key={item.key}
        action={activeTab === item.key ? "primary" : "secondary"}
        className={cn("flex-1")}
        onPress={() => {
          if (onPressCB) onPressCB(item.key);
        }}
      >
        <ButtonText className={cn("text-lg font-medium")}>
          {item.label}
        </ButtonText>
      </Button>
    );
  };

  if (!data) return <Loading />;

  return (
    <View className="flex-1">
      <View className="relative flex-1 max-h-[200px] items-center justify-center">
        <AppText
          containerClassName="self-center"
          className="font-medium !text-2xl self-center z-[2] !text-white"
        >
          {data?.title + " - " + data?.id?.slice(0, 6)}
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

      <MoneyView piggyBank={data.piggyBank} />

      <Tabs
        className="mt-4 flex-1"
        items={itemsTab}
        renderItem={renderTabTrigger}
      >
        <TabsContent tabKey="Today" className="flex-1 py-8 px-4">
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            keyExtractor={(item) => item.toString()}
            contentContainerClassName="gap-4 pb-4"
            renderItem={() => <CardToday />}
          />
        </TabsContent>

        <TabsContent tabKey="History ">
          <AppText className="text-primary-foreground-0">
            asdfsdafjlkj tab1
          </AppText>
        </TabsContent>
      </Tabs>

      {/* <TabsNavigation /> */}
    </View>
  );
};

interface CardTodayProps {
  type?: "contribute" | "withdraw";
}

const CardToday = ({ type = "contribute" }: CardTodayProps) => {
  return (
    <View className="flex-row gap-2">
      <AppText className="font-medium text-lg">Nguyễn Văn hiệp</AppText>
      <AppText className="text-lg">
        {type === "contribute" ? "đã góp" : "đã rút"}
      </AppText>
      <AppText
        className={cn("!text-green-500 font-medium text-lg", {
          "!text-red-500": type === "withdraw",
        })}
      >
        {type === "contribute" ? "+" : "-"}20,000 VNĐ
      </AppText>
    </View>
  );
};

export default DetailPlans;
