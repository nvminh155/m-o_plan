import React from "react";
import { View, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
}

const Input: React.FC<InputProps> = ({
  prefix,
  suffix,
  className,
  ...props
}) => {
  return (
    <View
      className={`flex-row items-center border gap-3 border-gray-300 rounded-full ${className}`}
      style={{
        height: 50,
      }}
    >
      {prefix}
      <TextInput
        className="flex-1 text-base text-gray-800"
        placeholderTextColor="#999"
        textBreakStrategy="highQuality"
        {...props}
      />
      {suffix }
    </View>
  );
};

export default Input;
