import React, { useEffect, useRef } from "react";
import MapView, {
  MapMarkerProps,
  MapViewProps,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  DestinationMarker,
  DestinationMarkerProps,
  UserMarker,
} from "./AppMapMarker";
import { cn } from "@/lib/cn";
import { useLocation } from "@/hooks/useLocation";
import { useAppStore } from "@/stores/app-store";
import { MarkerActivity } from "../marker-activity";
import { View } from "react-native";

interface MapScreenProps extends MapViewProps {
  markers?: DestinationMarkerProps[];
  otherMarkers?: MapMarkerProps[];
  isShowBtnFullScreen?: boolean;
  children?: React.ReactNode;
}

const MapScreen = React.forwardRef<
  React.ElementRef<typeof MapView>,
  MapScreenProps
>(
  (
    {
      markers = [],
      className,
      isShowBtnFullScreen,
      initialRegion = {
        latitude: 13.33420029031534,
        latitudeDelta: 10.969723141807847,
        longitude: 108.8669391721487,
        longitudeDelta: 9.573061466217041,
      },
      children,
      ...rest
    },
    ref
  ) => {
    const myLocation = useAppStore((state) => state.data.location);

    // const mapRef = useRef<MapView | null>(null);

    // useEffect(() => {
    //   if (!mapRef.current) return;
    //   mapRef.current.fitToSuppliedMarkers(["marker 0"], {
    //     edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    //     animated: true,
    //   });
    // }, []);

    return (
      <View className={cn("flex-1", className)}>
        <MapView
          ref={ref}
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          initialRegion={{ ...initialRegion }}
          className={cn("flex-1", className)}
          {...rest}
        >
          {/* {myLocation && (
          <UserMarker
            coordinate={myLocation.coords}
            title="Vị trí của bạn"
            avatar={require("@/assets/images/3x4anime.jpg")}
          />
        )} */}

          <MarkerActivity
            activity={{
              priority: 10,
              location: {
                latitude: myLocation.coords.latitude,
                longitude: myLocation.coords.longitude,
              },
              title: "Đà Nẵng",

              id: "1",
              participants: [],
            }}
            isCompleted={false}
            onPress={() => {}}
          />
          {markers.map((marker, index) => (
            <DestinationMarker key={index + 1} {...marker} />
          ))}

          {children}
          {/* {isShowBtnFullScreen && (
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
      )} */}
        </MapView>
      </View>
    );
  }
);

export default MapScreen;
