import React from "react";
import { Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { ArrowLeftIcon, Icon, UtensilsIcon } from "./ui/icon";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";

export default function RestaurantDetail() {
  return (
    <Box className="flex-1 bg-white">
      {/* Header */}
      <Box className="pt-12 px-4 border-b-2 border-b-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon as={ArrowLeftIcon} size="md" color="$white" />
        </TouchableOpacity>
      </Box>

      {/* Restaurant Card */}
      <Box
      className="mx-4 my-4 bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <HStack space="md" className="items-start">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eCWOTfzv3no6nV6SPbYkR9nSrZR77g.png",
            }}
            style={styles.restaurantImage}
          />
          <VStack className="flex-1 p-2" space="xs">
            <Text size="xl" className="font-semibold">
              Banh Canh Ghe Ut Coi
            </Text>

            {/* Rating */}
            <HStack space="xs">
              <HStack>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Box
                  className="w-4 h-4 rounded-full bg-green-500 opacity-100 mr-0.5" key={index + 1}
                  />
                ))}
              </HStack>
              <Text size="md" className="ml-2">
                9.4
              </Text>
            </HStack>

            {/* Categories */}
            <HStack  space="sm" className="flex-wrap">
              <HStack  space="xs">
                <Icon as={UtensilsIcon} size="sm" className="text-gray-700" />
                <Text size="md" className="text-gray-700">
                  Restaurant
                </Text>
              </HStack>

              <HStack  space="xs">
                {/* <Icon as={Tag} size="sm" className="text-gray-700" /> */}
                <Text size="md" className="text-gray-700">
                  Seafood • Asian • $
                </Text>
              </HStack>
            </HStack>

            {/* Hours */}
            <HStack  space="xs" mt="$1">
              <Icon as={Clock} size="sm" className="text-gray-700" />
              <Pressable>
                <Text
                  size="md"
                  className="text-gray-700"
                >
                  See Hours
                </Text>
              </Pressable>
            </HStack>
          </VStack>

          {/* More options */}
          <Pressable className="p-2">
           <Text> More options</Text>
          </Pressable>
        </HStack>
      </Box>



    </Box>
  );
}

const styles = StyleSheet.create({
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});
