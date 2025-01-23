import { IconMaterialCommunity } from "../../icon";
import IconAntd from "../../icon/IconAntd";
import IconEntypo from "../../icon/IconEntypo";
import IconEvil from "../../icon/IconEvil";
import AppButton from "../../ui/AppButton";
import AppText from "../../ui/AppText";
import { cn } from "../../../lib/cn";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const ActiveNow = () => {
  return (
    <View className="flex-1 mt-node rounded-[30px]">
      <Image
        source={require("@/assets/images/3x4anime.jpg")}
        className="absolute w-full h-full z-[0] rounded-[30px]"
        style={{
          aspectRatio: 3 / 4,
        }}
      />
      <View
        className="members flex-row bg-white rounded-[23px] p-0.5 mr-4 mt-4"
        style={{
          alignSelf: "flex-end",
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index + 1} style={{ alignSelf: "flex-start" }}>
            <Image
              source={"https://picsum.photos/seed/696/3000/2000"}
              className={cn(
                "h-10 w-10 rounded-full border-[1.5px] border-white",
                {
                  "-ml-5": index !== 0,
                }
              )}
            />
          </View>
        ))}
        <View className="bg justify-center items-center flex-row text-white rounded-full pr-2">
          <AppText containerClassName="self-center" className="font-medium">
            +2
          </AppText>
        </View>
      </View>

      <MapActive />
    </View>
  );
};

const MapActive = () => {
  return (
    <View className="flex-1 max-h-[70%] p-4 mt-auto">
      <View className="flex-1 p-2 rounded-[23px] bg-white relative">
        <View className="pl-3 pb-3 flex-row items-center justify-between">
          <View>
            <AppText className="font-medium text-lg">
              Traveling to Switzerland
            </AppText>

            <SubTitle />
          </View>
          <AppButton
            variant="primary"
            size="icon"
            className="!p-0 h-[3rem] w-[3rem]  bg-gray-100 mr-3"
          >
            <IconMaterialCommunity
              name="bell-ring-outline"
              className="!text-accent "
            />
          </AppButton>
        </View>

        <YourMap />
      </View>
    </View>
  );
};

const SubTitle = () => {
  return (
    <View className="flex-row items-center gap-1">
      <IconAntd name="calendar" className="!text-color/60" size={15} />
      <AppText className="text-sm">11 Nov - 16 Nov</AppText>
      <View className="w-1 h-1 bg-color/20"></View>
      <IconAntd name="clockcircleo" className="!text-color/60" size={15} />
      <AppText text="Tomorrow" className="!text-color/60 font-medium text-sm" />
    </View>
  );
};

const YourMap = () => {
  return (
    <View className="flex-1 rounded-[19px] overflow-hidden relative">
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
        <Marker
          coordinate={{ latitude: 10.9996864, longitude: 106.6782293 }}
          title="my location"
        >
          <View className="bg-white rounded-full h-6 w-6 relative">
            <View className="bg-primary rounded-full border-2 w-full h-full items-center justify-center border-white">
              <IconEvil name="location" size={15} className="!text-white" />
            </View>
            <View className="h-1.5 1 w-1 rounded-br-md rounded-bl-md absolute bg-white -bottom-1 left-1/2 -translate-x-1/2" />
          </View>
        </Marker>
      </MapView>

      <AppButton
        variant="primary"
        size="icon"
        className="!p-0 h-[3rem] w-[3rem] absolute right-0 bottom-0 bg-accent"
        onPress={() => {
          router.push("/(home)/full-view-map-activity");
        }}
      >
        <IconEntypo
          name="resize-full-screen"
          className="!text-accent-foreground "
        />
      </AppButton>
    </View>
  );
};

export default ActiveNow;
