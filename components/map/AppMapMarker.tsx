import React from "react";
import { View } from "react-native";
import { MapMarkerProps, Marker } from "react-native-maps";
import { IconEvil } from "../icon";

interface AppMapMarkerProps extends MapMarkerProps {}

const AppMapMarker = ({
  coordinate = { latitude: 10.9996864, longitude: 106.6782293 },
  title,
  className,
  ...rest
}: AppMapMarkerProps) => {
  return (
    <Marker coordinate={coordinate} title={title} {...rest}>
      <View className="bg-white rounded-full h-6 w-6 relative">
        <View className="bg-primary rounded-full border-2 w-full h-full items-center justify-center border-white">
          <IconEvil name="location" size={15} className="!text-white" />
        </View>
        <View className="h-1.5 1 w-1 rounded-br-md rounded-bl-md absolute bg-white -bottom-1 left-1/2 -translate-x-1/2" />
      </View>
    </Marker>
  );
};

export default AppMapMarker;
