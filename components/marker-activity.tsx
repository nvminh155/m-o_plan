import { Activity } from "@/types/fake/activity";
import type React from "react";
import { Marker, Callout } from "react-native-maps";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { CaretDownIcon, CaretDownSolidIcon, CheckCircleIcon, Icon, TickIcon } from "./ui/icon";
import { VStack } from "./ui/vstack";
import { HStack } from "./ui/hstack";
import { Badge, BadgeText } from "./ui/badge";
import { View } from "react-native";

interface CustomMarkerProps {
  activity: Activity & {
    priority: number;
  };
  isCompleted: boolean;
  onPress: (activity: Activity) => void;
}

export const MarkerActivity: React.FC<CustomMarkerProps> = ({
  activity,
  isCompleted,
  onPress,
}) => {
  // Xác định màu dựa trên mức độ ưu tiên
  const getPriorityColor = (priority: number): string => {
    switch (priority) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  const priorityColor = getPriorityColor(activity.priority);

  return (
    <Marker
      coordinate={activity.location}
      onPress={() => onPress(activity)}
      title="13123"
    >
      {/* Circular marker with priority number */}
      <Box
        className={`w-9 h-9 rounded-full relative border border-white ${
          isCompleted ? "bg-green-600" : "bg-gray-800"
        } flex justify-center items-center shadow-lg`}
        style={{
          position: 'relative'
        }}
      >
        <Text className="text-white font-bold" size="xs">
          {activity.priority}
        </Text>
        <View className="w-auto h-auto  absolute -bottom-[10px]">
        <Icon as={CaretDownSolidIcon} className="text-white" />
        </View>
      </Box>

      {/* Checkmark for completed activities */}


    </Marker>
  );
};
