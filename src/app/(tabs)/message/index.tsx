import AppImage from "@/components/image/AppImage";
import AppButton from "@/components/ui/AppButton";
import AppText from "@/components/ui/AppText";
import Wrapper from "@/components/ui/Wrapper";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const Message = () => {
  return (
    <Wrapper>
      <ScrollView contentContainerClassName="gap-4 pb-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <CardUserConversation key={index + 1} id={index} />
        ))}
      </ScrollView>
    </Wrapper>
  );
};

interface CardUserConversationProps {
  className?: string;
  id: number;
}
const CardUserConversation = ({ id }: CardUserConversationProps) => {
  return (
    <AppButton
      className="flex-row items-center bg-transparent !px-2 !py-2"
      onPress={() => {
        router.push({
          pathname: "/chat-private/[id]",
          params: { id },
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
          Jana Cooper
        </AppText>
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full bg-green-500"></View>
          <AppText className="!text-accent/60 font-medium">Online</AppText>
        </View>
      </View>

      <View className="items-center ml-auto gap-1 pr-2">
        <AppText className="font-medium self-center !text-accent/60">
          15:00
        </AppText>
        <AppText
          containerClassName="rounded-full w-12 h-12 items-center justify-center bg-primary self-center"
          className="self-center text-primary-foreground font-medium"
        >
          3
        </AppText>
      </View>
    </AppButton>
  );
};
export default Message;
