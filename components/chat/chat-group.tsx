import HeaderChat from "@/components/chat/chat-container/header-chat";
import ChatInput from "@/components/chat/chat-input";
import { IconAntd } from "@/components/icon";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon, SearchIcon } from "@/components/ui/icon";
import { BarOutlineIcon } from "@/components/ui/icon/custom";
import { LinearGradient } from "@/components/ui/linear-gradient";
import Loading from "@/components/ui/loading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuthContext } from "@/contexts/AuthProvider";
import { db } from "@/firebaseConfig";
import { useMessagesQuery } from "@/hooks/query/useMessagesQuery";
import { TMessage, TMessageUser } from "@/types/chat";
import { generateid } from "@/utils/generateId";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from "react-native";

const ChatGroupScreen = () => {
  const { user } = useAuthContext();

  const {
    id,
  }: {
    id: string;
  } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const messagesQuery = useMessagesQuery(id);

  const mutation = useMutation({
    mutationFn: async (variables: { data: TMessageUser; idDoc: string }) => {
      const { data, idDoc } = variables;
      try {
        await setDoc(doc(db, `chats/${id}/messages/`, idDoc), data);
      } catch (e) {
        console.log(e);
      }

      return {
        data,
      };
    },
  });

  const handleSendMessage = async (text: string) => {
    text = text.trim();

    const idDoc = `message_${generateid()}`;
    console.log(id);
    const messageData: TMessageUser = {
      typeUser: "user",
      content: text,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      files: [],
      reactions: [],
      id: idDoc,
      sender: {
        avatar: user.avatar ?? null,
        fullName: user.fullName,
        id: user.id,
      },
    };

    mutation.mutate({ data: messageData, idDoc });
  };

  const sendAtTime = (timestamp: number) => {
    const date = new Date(timestamp);

    return date.getHours() + ":" + date.getMinutes();
  };

  const renderMessage = ({ item }: ListRenderItemInfo<TMessage>) => (
    <View
      style={[
        item.sender.id === user.id ? styles.yourMessage : styles.theirMessage,
      ]}
      className="p-4 mb-4 rounded-[8px]"
    >
      <Text>
        {item.typeUser === "user"
          ? (item as TMessageUser).content
          : "bot message here"}
      </Text>
      <Text size="xs" className="text-typography-500/50">
        {sendAtTime(item.createdAt)}
      </Text>
    </View>
  );

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  };

  if (messagesQuery.isPending && !messagesQuery.data) return <Loading />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
      onLayout={(e) => {
        scrollToEnd();
      }}
    >
      {/* Header */}
      <HeaderChat />

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messagesQuery.data?.data}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",

          paddingBottom: 12,
        }}
        onContentSizeChange={() => {
          scrollToEnd();
        }}
      />

      <ChatInput onSendCallBack={handleSendMessage} />
    </KeyboardAvoidingView>
  );
};

export default ChatGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatArea: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
  },
  yourMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7ff",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
  },
});
