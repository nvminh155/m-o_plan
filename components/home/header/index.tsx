import AppButton from "@/components/stories/AppButton/AppButton";
import AppText from "@/components/ui/AppText";
import IconAntd from "@/components/icon/IconAntd";
import { View } from "react-native";
import IconIcons from "@/components/icon/IconIcons";
import Avatar from "@/components/ui/Avatar";

export default function Header() {
  return (
    <View className="header flex-row items-center justify-between">
      <View className="logo">
        <AppText
          text="M/O Plans"
          className="font-semibold text-xl text-primary"
        />
      </View>

      <View className="flex-row gap-1">
        <AppButton
          variant="primary"
          size="icon"
          className="!p-0 h-[3rem] w-[3rem]"
        >
          <IconAntd name="search1" className="!text-primary-foreground " />
        </AppButton>

        <AppButton
          variant="primary"
          size="icon"
          className="!p-0 h-[3rem] w-[3rem]"
        >
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
