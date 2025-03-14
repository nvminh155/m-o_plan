import React from "react";

import { useState, useEffect, useRef } from "react";
import { ScrollView } from "react-native";

import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import {
  BedIcon,
  CameraIcon,
  CloseIcon,
  Icon,
  MapPinIcon,
  PlaneIcon,
  UtensilsIcon,
} from "@/components/ui/icon";

import MapScreen from "@/components/map";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { TActivity } from "@/types/plan";
import ButtonNextStep from "@/components/plans/create/button-next-step";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "@/schemas/planSchema";
import { z } from "zod";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { toTime } from "@/utils/datetime/to-time";

interface ListActivityProps {
  data: Omit<TActivity, "id">[];
  onPressActivity?: (activity: Omit<TActivity, "id">) => void;
}

const ListActivity = ({ data, onPressActivity }: ListActivityProps) => {
  return (
    <ScrollView
      className="flex-1 px-4 pb-4"
      contentContainerClassName="gap-4 pb-4"
    >
      {data.map((activity, index) => {
        const fromHoursString = toTime(activity.fromHours);
        const toHoursString = toTime(activity.toHours);

        return (
          <Pressable
            key={index + 1}
            style={{ elevation: 2 }}
            className="bg-white p-4 rounded-xl"
            onPress={() => {
              if (onPressActivity) onPressActivity(activity);
            }}
          >
            <VStack className="bg-primary-50 h-12 w-12   p-2 rounded-full">
              <Icon
                as={PlaneIcon}
                className="h-full w-full  text-primary-600"
              />
            </VStack>
            <VStack>
              <HStack className="gap-3">
                <Heading>{activity.title}</Heading>
                <Text className="text-gray-400" size="sm">
                  {fromHoursString} - {toHoursString}
                </Text>
              </HStack>
              <Text>{activity.note}</Text>
            </VStack>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default ListActivity;
