import { IconAntd } from "@/components/icon";
import AppButton from "@/components/ui/AppButton";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from "react-native";

type TMessage = {
  id: string;
  text: string;
  sender: string;
};

const ChatPrivate = () => {
  const { id } = useLocalSearchParams();

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, sender: "You" },
      ]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }: ListRenderItemInfo<TMessage>) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "You" ? styles.yourMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Header */}
      <View
        style={styles.header}
        className="flex-row items-center gap-3 pl-4 !rounded-none justify-start"
      >
        <AppButton
          className="bg-transparent !px-0 !py-0"
          onPress={() => {
            router.back();
          }}
        >
          <IconAntd name="arrowleft" size={24} color="#fff" />
          <Text style={styles.headerText}>Private Chat {id}</Text>
        </AppButton>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChangeText={setInputText}
        />
        <AppButton style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </AppButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatPrivate;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
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
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: "80%",
  },
  yourMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7ff",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
