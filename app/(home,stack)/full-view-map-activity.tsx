import AppMapMarker from "@/components/map/AppMapMarker";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const FullViewMapActivity = () => {
  return (
    <View className="flex-1">
      <HStack className="bg-white items-center">
        <Button
          className="mr-auto"
          variant="link"
          action="default"
          size="xl"
          onPress={() => router.back()}
        >
          <ButtonIcon as={ArrowLeftIcon} />
        </Button>
        <Text className="text-center font-bold mr-auto" size="lg">Toàn bản đồ</Text>
      </HStack>
      <View className="flex-1">
        <MapView
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: 13.33420029031534,
            latitudeDelta: 10.969723141807847,
            longitude: 108.8669391721487,
            longitudeDelta: 9.573061466217041,
          }}
        >
          <AppMapMarker
            coordinate={{ latitude: 10.9996864, longitude: 106.6782293 }}
          />
        </MapView>
      </View>
    </View>
  );
};

export default FullViewMapActivity;
