import AppButton from "../../ui/AppButton";
import AppText from "../../ui/AppText";
import IconAntd from "../../icon/IconAntd";
import { View } from "react-native";
import IconIcons from "../../icon/IconIcons";
import Avatar from "../../ui/Avatar";

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
