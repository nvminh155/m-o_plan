import AppImage from "@/components/image/AppImage";
import { Button } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import Wrapper from "@/components/ui/Wrapper";
import { router } from "expo-router";
import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/chatService";
import Loading from "@/components/ui/loading";
import { useAuthContext } from "@/contexts/AuthProvider";
import { TChat, TChatGroup, TChatPrivate } from "@/types/chat";

const Message = () => {
  const { user } = useAuthContext();

  const query = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await chatService.getListRoom(user ? user.id : "123"),
  });

  const renderConversation = ({ item }: ListRenderItemInfo<TChat>) => {
    return <CardUserConversation key={item.id} data={item} />;
  };

  if (query.isPending) return <Loading />;

  return (
    <Wrapper>
      <FlatList
        contentContainerClassName="gap-4 pb-6"
        data={query.data?.data}
        renderItem={renderConversation}
      />
    </Wrapper>
  );
};

interface CardUserConversationProps {
  className?: string;
  data: TChat;
}
const CardUserConversation = ({
  className,
  data,
}: CardUserConversationProps) => {
  return (
    <Button
      size="auto"
      className="flex-row items-center bg-transparent !px-2 !py-2"
      onPress={() => {
        router.push({
          pathname: "/chat-private/[id]",
          params: { id: data.id },
        });
      }}
    >
      <AppImage
        source={require("@/assets/images/3x4anime.jpg")}
        className="w-24 h-24 rounded-full"
      />

      <View className="flex-col justify-start gap-1 ml-4">
        <AppText
          className="font-medium self-start text-lg"
          containerClassName="self-start"
        >
          {data.type === "group"
            ? (data as TChatGroup).groupName
            : (data as TChatPrivate).receiver.fullName}
        </AppText>
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-green-500"></View>
          <AppText className="!text-tertiary-500/50 font-medium">
            Online
          </AppText>
        </View>
      </View>

      <View className="items-center ml-auto gap-1 pr-2">
        <AppText className="font-medium self-center !text-tertiary-500">
          15:00
        </AppText>
        <AppText
          containerClassName="rounded-full w-12 h-12 items-center justify-center bg-primary self-center bg-primary-500"
          className="self-center text-primary-foreground font-medium text-primary-foreground-500"
        >
          3
        </AppText>
      </View>
    </Button>
  );
};
export default Message;
