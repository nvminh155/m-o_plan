import { IconAntd, IconIcons, IconFontAwesome } from "@/components/icon";
import AppButton from "@/components/stories/AppButton/AppButton";
import AppText from "@/components/ui/AppText";
import Input from "@/components/ui/input";
import { ScrollView, View } from "react-native";

const FastSchedule = () => {
  return (
    <View className="mt-5">
      <View className="flex-row items-center gap-3">
        <Input
          className="rounded-full px-5 border-border text-gray-500 border-[.8px] flex-1"
          placeholder="Tôi muốn ..."
          suffix={
            <View className="flex-row items-center justify-end gap-3 h-full w-auto">
              <IconFontAwesome name={"tasks"} className="!text-color/60" />
              <IconAntd name="staro" className="!text-color/60" />
            </View>
          }
        />
        <AppButton variant="primary" size="icon" className="!rounded-full !p-4">
          <IconFontAwesome
            name="send-o"
            version={4}
            className="!text-primary-foreground"
            size={20}
          />
        </AppButton>
      </View>

      <ScrollView
        contentContainerClassName="items-center flex-row gap-3 mt-5"
        horizontal
      >
        <AppButton variant="primary" className="!font-medium !rounded-full">
          <View className="flex-row h-full items-center gap-2">
            <IconIcons
              name="notifications-outline"
              className="!text-primary-foreground"
              size={20}
            />
            <AppText
              text="Now"
              className="!text-primary-foreground font-medium"
            />
          </View>
        </AppButton>
        <AppButton variant="ghost" className="!font-medium !rounded-full">
          <View className="flex-row h-full items-center gap-2">
            <IconAntd name="clockcircleo" className="!text-color/60" />
            <AppText text="Tomorrow" className="!text-color/60 font-medium" />
          </View>
        </AppButton>
        <AppButton variant="ghost" className="!font-medium !rounded-full">
          <View className="flex-row h-full items-center gap-2">
            <IconAntd name="calendar" className="!text-color/60" />
            <AppText text="Next Week" className="!text-color/60 font-medium" />
          </View>
        </AppButton>
        <AppButton variant="ghost" className="!font-medium !rounded-full">
          <View className="flex-row h-full items-center gap-2">
            <IconIcons
              name="notifications-outline"
              className="!text-color/60"
            />
            <AppText text="Next Week" className="!text-color/60 font-medium" />
          </View>
        </AppButton>
      </ScrollView>
    </View>
  );
};

export default FastSchedule;
