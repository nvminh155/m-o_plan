import { IconAntd, IconIcons, IconFontAwesome } from "../../icon";
import { Button, ButtonIcon, ButtonText } from "../../ui/button";
import AppText from "../../ui/AppText";
import Input from "../../ui/input";
import { ScrollView, View } from "react-native";
import { cn } from "@/lib/cn";

const FastSchedule = () => {
  const actions: TAction[] = [
    { text: "Now", iconName: "notifications-outline", iconType: "icons" },
    { text: "Tomorrow", iconName: "clockcircleo", iconType: "antd" },
    // from scroll view
    { text: "Next Week", iconName: "calendar", iconType: "antd" },
    { text: "Next Week", iconName: "calendar", iconType: "antd" },
  ];

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
        <Button action="primary" size="lg" className="!rounded-full">
          <IconFontAwesome
            name="send-o"
            version={4}
            className="!text-primary-foreground"
            size={20}
          />
        </Button>
      </View>

      <ScrollView
        contentContainerClassName="items-center flex-row gap-3 mt-5"
        horizontal
      >
        {actions.map((btn, i) => (
          <Action key={i + 1} item={btn} active={i === 0} />
        ))}
      </ScrollView>
    </View>
  );
};

type TAction = {
  text: string;
  iconName: any;
  iconType: "antd" | "icons";
};
interface ActionProps {
  item: TAction;
  active?: boolean;
}

const Action = ({ item, active }: ActionProps) => {
  const MyIcon = item.iconType === "antd" ? IconAntd : IconIcons;

  return (
    <Button
      action={active ? "primary" : "secondary"}
      className="!font-medium !rounded-full"
    >
      <MyIcon
        name={item.iconName}
        className={cn({
          "!text-typography-800": !active,
        })}
        size={20}
      />
      <ButtonText>{item.text}</ButtonText>
    </Button>
  );
};
export default FastSchedule;
