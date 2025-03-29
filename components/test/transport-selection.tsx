"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeftIcon, Icon, TickIcon } from "../ui/icon";
import { HStack } from "../ui/hstack";
import { cn } from "@/lib/cn";

type TransportOption = {
  id: string;
  label: string;
  selected: boolean;
};

export const TransportSelection = ({
  onComplete,
  currentStep = 3,
  totalSteps = 5,
}: {
  onComplete: (selectedOptions: string[]) => void;
  currentStep?: number;
  totalSteps?: number;
}) => {
  const router = useRouter();
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([
    { id: "public", label: "Public transport", selected: true },
    { id: "taxi", label: "Taxi", selected: false },
    { id: "walking", label: "Walking", selected: true },
    { id: "ridesharing", label: "Ride sharing", selected: true },
    { id: "rental", label: "Rental", selected: false },
  ]);

  const toggleOption = (id: string) => {
    setTransportOptions(
      transportOptions.map((option) =>
        option.id === id ? { ...option, selected: !option.selected } : option
      )
    );
  };

  const handleContinue = () => {
    const selectedOptions = transportOptions
      .filter((option) => option.selected)
      .map((option) => option.id);
    onComplete(selectedOptions);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="flex-grow !p-[20px]"
        showsVerticalScrollIndicator={false}
      >
        <HStack className="mb-[24px] mt-4">
          <TouchableOpacity onPress={handleBack} className="p-[8px] mr-[12px]">
            <Icon as={ChevronLeftIcon} color="#000" />
          </TouchableOpacity>
          <View className="flex-1">
            <View className="h-[4px] bg-[#E5E7EB] rounded-[2px] overflow-hidden mb-[8px]">
              <View
                className={cn(
                  `h-full bg-[#4F46E5] rounded-[2px] w-[${
                    (currentStep / totalSteps) * 100
                  }%]`
                )}
              />
            </View>
            <Text className="text-[12px] text-[#6B7280] text-right">
              {currentStep} of {totalSteps}
            </Text>
          </View>
        </HStack>

        <View className="flex-1 mb-[24px]">
          <Text className="text-[16px] text-[#6B7280] mb-[8px]">
            What's your favorite transport option?
          </Text>
          <Text className="text-[24px] font-bold text-[#111827] mb-[24px]">
            Pick your Ride
          </Text>

          <View className="items-center mb-[24px]">
            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kAFnWukY4JeteC54PsELwxhCfbqz3b.png",
              }}
              className="w-[150px] h-[150px]"
              resizeMode="contain"
            />
          </View>

          <View className="gap-[12px]">
            {transportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={cn(
                  "flex-row items-center p-[16px] rounded-[12px] border-[#E5E7EB] border",
                  {
                    "bg-[#EEF2FF] border-[#4F46E5]": option.selected,
                  }
                )}
                onPress={() => toggleOption(option.id)}
                activeOpacity={0.7}
              >
                <View
                  className={cn(
                    "w-[20px] h-[20px] rounded-[10px] border-[2px] border-[#D1D5D8] items-center justify-center mr-[12px]",
                    {
                      "border-[#4F46E5] bg-[#4F46E5]": option.selected,
                    }
                  )}
                >
                  {option.selected && (
                    <Icon
                      as={TickIcon}
                      color="white"
                      className="w-[10px] h-[10px] "
                    />
                  )}
                </View>

                <Text className="text-[16px] text-[#374151]">
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#6366F1] rounded-[12px] p-[16px] items-center justify-center"
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text className="text-white text-[16px] font-[600]">Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
