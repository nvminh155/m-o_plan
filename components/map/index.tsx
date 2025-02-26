import React, { useEffect, useState } from "react";
import { VStack } from "../ui/vstack";
import { Button, ButtonIcon } from "../ui/button";
import MapView from "react-native-maps";
import { useRouter } from "expo-router";
import { ResizeFullScreenIcon } from "../ui/icon";
import * as Location from "expo-location";
import {
  DestinationMapMarker,
  DestinationMapMarkerProps,
  UserMapMarker,
} from "./AppMapMarker";
import { cn } from "@/lib/cn";

interface MapScreenProps {
  markers?: DestinationMapMarkerProps[];
  className?: string;
  isShowBtnFullScreen?: boolean;
}

const MapScreen = ({
  markers = [],
  className,
  isShowBtnFullScreen,
}: MapScreenProps) => {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  console.log("my location", location?.coords);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return (
    <VStack className={cn("flex-1", className)}>
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
        {location && (
          <UserMapMarker
            coordinate={location.coords}
            title="Vị trí của bạn"
            avatar={require("@/assets/images/3x4anime.jpg")}
          />
        )}

        {markers.map((marker, index) => (
          <DestinationMapMarker key={index + 1} {...marker} />
        ))}
      </MapView>

      {isShowBtnFullScreen && (
        <Button
          action="primary"
          size="lg"
          className="!p-0 h-[3rem] w-[3rem] absolute left-4 bottom-4 bg-tertiary-500"
          onPress={() => {
            router.push("/(home)/full-view-map-activity");
          }}
        >
          <ButtonIcon as={ResizeFullScreenIcon} />
        </Button>
      )}
    </VStack>
  );
};

export default MapScreen;
