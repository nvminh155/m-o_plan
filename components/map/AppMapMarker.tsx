import React from "react";
import { View } from "react-native";
import { MapMarkerProps, Marker } from "react-native-maps";
import { Icon, LocationIcon } from "../ui/icon";
import AppImage from "../image/AppImage";

interface AppMapMarkerProps extends Omit<MapMarkerProps, "coordinate"> {
  coordinate?: {
    latitude: number;
    longitude: number;
  };
  children?: React.ReactNode;
}

const BaseMapMarker = ({
  coordinate = { latitude: 10.9996864, longitude: 106.6782293 },
  title,
  className,
  children,
  ...rest
}: AppMapMarkerProps) => {
  return (
    <Marker coordinate={coordinate} title={title} {...rest}>
      {children}
    </Marker>
  );
};

interface UserMapMarkerProps extends AppMapMarkerProps {
  avatar: any;
}
const UserMarker = ({
  avatar,
  ...rest
}: UserMapMarkerProps) => {
  return (
    <BaseMapMarker {...rest}>
      <View className="bg-primary-500 rounded-full border-2 w-10 h-10 items-center justify-center border-white">
        <AppImage source={avatar} className="w-8 h-8 rounded-full" />
      </View>
    </BaseMapMarker>
  );
};

export interface DestinationMarkerProps extends AppMapMarkerProps {}

const DestinationMarker = ({ ...rest }: DestinationMarkerProps) => {
  return (
    <BaseMapMarker {...rest}>
      <View className="bg-primary-500 rounded-full border-2 w-10 h-10 items-center justify-center border-white">
        <Icon as={LocationIcon} className="text-white h-8 w-8" />
      </View>
    </BaseMapMarker>
  );
};

export { BaseMapMarker, UserMarker, DestinationMarker };
