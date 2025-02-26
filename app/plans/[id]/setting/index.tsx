import { HStack } from "@/components/ui/hstack";
import { ChevronRightIcon, Icon, SearchIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const SettingScreen = () => {
  return (
    <VStack className="flex-1">
      <SectionSetting />
    </VStack>
  );
};

const SectionSetting = () => {
  return (
    <HStack className="justify-between">
      <HStack space="md">
        <Icon as={SearchIcon} />
        <Text>Thông tin cơ bản</Text>
      </HStack>
      <Icon as={ChevronRightIcon} />
    </HStack>
  );
};

export default SettingScreen;
