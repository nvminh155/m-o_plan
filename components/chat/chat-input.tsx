import React, { useState } from "react";
import { HStack } from "../ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { SendIcon } from "../ui/icon";

// làm cái hiển thị Đang gửi tin nhắn

interface ChatInputProps {
  onSendCallBack?: (text: string) => void;
}
const ChatInput = ({ onSendCallBack }: ChatInputProps) => {
  const [inputText, setInputText] = useState("");

  return (
    <HStack className="gap-4 px-4 items-center mt-8">
      <Input className="flex-1 px-4 rounded-full" size="lg">
        <InputField
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChangeText={setInputText}
        />
        <InputSlot
          onPress={() => {
            if (onSendCallBack) {
              onSendCallBack(inputText);
              setInputText("");
            }
          }}
        >
          <InputIcon as={SendIcon} className="text-primary-500" />
        </InputSlot>
      </Input>
    </HStack>
  );
};

export default ChatInput;
