import AppImage from "@/components/image/AppImage";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuthContext } from "@/contexts/AuthProvider";

import React from "react";

const LoginScreen = () => {
  const { handleLogin, logout } = useAuthContext();

  return (
    <VStack className="flex-1 bg-white px-4">
      <AppImage
        source={require("@/assets/images/banner_auth.avif")}
        className="w-full h-[300px]"
      />
      <VStack className="mt-12">
        <HStack className="gap-3">
          <Text size="4xl" bold>
            TẠO
          </Text>
          <Text size="4xl" bold className="text-primary-500">
            KẾ HOẠCH
          </Text>
        </HStack>
        <Text size="4xl" bold className="ml-auto">
          NGAY BÂY GIỜ
        </Text>
      </VStack>

      <Button
        action="primary"
        variant="outline"
        onPress={() => {
          handleLogin("minhnv155@gmail.com", "123456");
        }}
      >
        <ButtonText className="text-black font-semibold">
          Đăng nhập minhv155@gmail.com
        </ButtonText>
      </Button>
      <Button
        action="primary"
        variant="outline"
        onPress={() => {
          logout();
        }}
      >
        <ButtonText className="text-black font-semibold">đăng xuất</ButtonText>
      </Button>
    </VStack>
  );
};

export default LoginScreen;
