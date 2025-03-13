import { HStack } from "@/components/ui/hstack";
import {
  ChevronRightIcon,
  EditIcon,
  Icon,
  LockLightIcon,
  SearchIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const SettingScreen = () => {
  return (
    <VStack className="flex-1 px-4 gap-4">
      <VStack className="mt-4"></VStack>
      <SectionSetting icon={EditIcon} name="Cập nhật thông tin quỹ" />

      <SectionSettingGroup title="Cài đặt thông báo">
        <SectionSetting icon={SearchIcon} name="Thông báo quỹ" />
        <SectionSetting icon={SearchIcon} name="Thông báo hoàn thành" />
      </SectionSettingGroup>

      <SectionSetting icon={LockLightIcon} name="Đóng kế hoạch" />
    </VStack>
  );
};

const SectionSettingGroup = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <VStack>
      <Text size="lg" className="font-semibold my-4">{title}</Text>
      <VStack className="gap-4">{children}</VStack>
    </VStack>
  );
};

interface SectionSettingProps {
  icon: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
  name: string;
}
const SectionSetting = ({ name, icon }: SectionSettingProps) => {
  return (
    <HStack className="justify-between bg-white p-4 rounded-xl">
      <HStack className="gap-4">
        <Icon as={icon} size="2xl" />
        <Text className="font-medium">{name}</Text>
      </HStack>
      <Icon as={ChevronRightIcon} />
    </HStack>
  );
};

export default SettingScreen;
