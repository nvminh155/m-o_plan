import { View } from "react-native";
import { HStack } from "../ui/hstack";
import { CalendarDaysIcon, ClockLightIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { useActivityContext } from "@/contexts/ActivityProvider";

// interface ActivitySubTitleProps {}

const ActivitySubtitle = () => {
  //this is next activity
  const { data } = useActivityContext();

  return (
    <HStack className="flex-row items-center gap-1">
      <Icon as={CalendarDaysIcon} className="!text-black/50" />
      <Text className="text-sm !text-black/50">11 Nov - 16 Nov</Text>
      <View className="w-1 h-1 bg-black/50 mx-1"></View>
      <Icon as={ClockLightIcon} className="!text-black/50" />
      <Text className="!text-black/50 text-sm changeme">Mai</Text>
    </HStack>
  );
};

export default ActivitySubtitle;
