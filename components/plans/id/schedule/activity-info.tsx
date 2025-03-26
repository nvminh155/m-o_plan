import { Badge, BadgeText } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ActivityInfoProps } from "@/types/fake/activity";
import type React from "react";

export const ActivityInfo: React.FC<ActivityInfoProps> = ({
  activity,
  isCompleted,
}) => {
  return (
    <VStack space="md">
      <Text size="lg" className="font-semibold">
        {activity.title}
      </Text>

      <Divider className="my-1" />

      <HStack space="md" className="items-center">
        <Text className="">
          {activity.note ? activity.note : "Không có"}
        </Text>
      </HStack>

      {isCompleted && (
        <Badge className="bg-primary-600 self-start mt-2">
          <BadgeText className="text-white">Hoàn thành</BadgeText>
        </Badge>
      )}
    </VStack>
  );
};
