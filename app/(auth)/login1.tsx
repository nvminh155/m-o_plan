import AppImage from "@/components/image/AppImage";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuthContext } from "@/contexts/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";

const LoginScreen = () => {
  const { handleLogin, logout } = useAuthContext();

  const [email, setEmail] = React.useState("minhnv155@gmail.com");
  const [password, setPassword] = React.useState("123456");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <VStack className="flex-1 bg-white px-4 gap-4">
        <AppImage
          source={require("@/assets/images/login_banner.jpg")}
          className="w-full h-1/2"
        />

        <Text size="3xl" className="font-semibold uppercase">
          HÃY tạo nên những chuyến{" "}
          <Text className="text-primary-500" size="3xl">
            du lịch
          </Text>{" "}
          tuyệt vời
        </Text>

        <VStack className="gap-4">
          <Input>
            <InputField
              placeholder="Địa chỉ email..."
              value={email}
              onChangeText={setEmail}
            />
          </Input>

          <Input>
            <InputField
              placeholder="Nhập mật khẩu..."
              value={password}
              onChangeText={setPassword}
            />
          </Input>
        </VStack>
        <Button
          action="primary"
          disabled={isLoading}
          onPress={() => {
            setIsLoading(true)
            try {
              handleLogin(email, password);
            } catch {

            } finally {
              setIsLoading(false)
            }
          }}
        >
          <ButtonText className="font-semibold">Đăng nhập</ButtonText>
        </Button>

        <HStack className="gap-4 justify-center items-center">
          <Text className="font-medium">Chưa có tài khoản?</Text>
          <Button
            variant="link"
            onPress={() => {
              router.push("/register");
            }}
            className=""
          >
            <ButtonText className="font-semibold">Đăng ký tài khoản</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
