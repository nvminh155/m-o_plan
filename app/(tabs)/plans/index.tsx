import AppImage from "@/components/image/AppImage";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icon";
import Wrapper from "@/components/ui/Wrapper";
import { planService } from "@/services/planService";
import { TPlan } from "@/types/plan";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { View, Text, FlatList, ListRenderItemInfo } from "react-native";

export default function App() {
  const query = useQuery({
    queryKey: ["plans"],
    queryFn: () => planService.getList(),
  });

  const renderPlan = ({ item }: ListRenderItemInfo<TPlan>) => (
    <View className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
      <AppImage
        source={require("@/assets/images/test/16x9anime.png")}
        className="w-full aspect-video"
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600 mb-2">
          {"GO to the moon test_app"}
        </Text>
        <Button
          action="primary"
          className="py-2 rounded-lg items-center"
          onPress={() => {
            router.push({
              pathname: "/plans/[id]",
              params: { id: item.id ?? "????" },
            });
          }}
        >
          <ButtonText>Xem</ButtonText>
        </Button>
      </View>
    </View>
  );

  return (
    <Wrapper>
      <Button
        onPress={() => {
          router.push("/plans/create");
        }}
        size="lg"
        variant="outline"
        action="primary"
        className="rounded-full ml-auto !py-[.4rem]"
      >
        <ButtonIcon as={PlusIcon} />
      </Button>
      <FlatList
        data={query.data?.data}
        renderItem={renderPlan}
        keyExtractor={(item) => item.id ?? ""}
        contentContainerStyle={{ paddingBottom: 16 }}
        className="mt-node"
      />
    </Wrapper>
  );
}
