import AppButton from "@/components/stories/AppButton/AppButton";
import AppText from "@/components/ui/AppText";
import IconAntd from "@/components/icon/IconAntd";
import { View } from "react-native";
import IconIcons from "@/components/icon/IconIcons";
import Avatar from "@/components/ui/Avatar";

export default function Header() {
  return (
    <View className="header flex-row items-center justify-between max-h-[50px]">
      <View className="logo">
        <AppText
          text="M/O Plans"
          className="font-semibold text-xl text-primary"
        />
      </View>

      <View className="flex-row gap-2 flex-1 justify-end items-center">
        <AppButton variant="primary" size="icon">
          <IconAntd name="search1" className="!text-primary-foreground " />
        </AppButton>

        <AppButton variant="primary" size="icon">
          <IconIcons
            name="notifications-outline"
            className="!text-primary-foreground"
          />
        </AppButton>

        <Avatar />
      </View>
    </View>
  );
}
