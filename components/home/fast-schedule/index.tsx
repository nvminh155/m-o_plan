import { IconAntd, IconIcons, IconFontAwesome } from "../../icon";
import { Button, ButtonText } from "../../ui/button";

import { ScrollView, View } from "react-native";
import { cn } from "@/lib/cn";
import { Input, InputField } from "@/components/ui/input";

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
        <Input className="flex-1 rounded-full px-5" size="xl">
          <InputField
            className=" text-gray-500 "
            placeholder="Tôi muốn ..."
          />
        </Input>
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
          "!text-secondary-foreground-500": !active,
        })}
        size={20}
      />
      <ButtonText>{item.text}</ButtonText>
    </Button>
  );
};
export default FastSchedule;
