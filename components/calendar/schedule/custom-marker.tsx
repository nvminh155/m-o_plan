import { Box } from "@/components/ui/box";
import { CircleIcon, Icon, SearchIcon, TickIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Activity } from "@/types/fake/activity";
import React from "react";
import { Marker, Callout } from "react-native-maps";

interface CustomMarkerProps {
  activity: Activity;
  isCompleted: boolean;
  identifier:  string;
  onPress: (activity: Activity) => void;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  activity,
  identifier,
  isCompleted,
  onPress,
}) => {
  return (
    <Marker
      coordinate={activity.location}
      pinColor={isCompleted ? "#16a34a" : "blue"}
      // pinColor="#16a34a"
      onPress={() => onPress(activity)}
      style={{
        position: 'relative'
      }}
      identifier={identifier}
    >
      {isCompleted && (
        <Box className="absolute w-10 h-10 bg-white rounded-full p-1 border border-green-600">
          <Icon
            as={TickIcon}
            className="text-green-600"
            size="md"
          />
        </Box>
      )}
      {/* <Callout tooltip>
        <VStack className="bg-white p-2 rounded-md w-[150px]">
          <Text className="font-semibold">{activity.title}</Text>
          <Text size="xs" className="text-gray-600">
            {isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
          </Text>
        </VStack>
      </Callout> */}
    </Marker>
  );
};
