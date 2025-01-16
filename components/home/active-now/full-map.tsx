import AppMapMarker from "@/components/map/AppMapMarker";
import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const FullMap = () => {
  return (
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
  );
};

export default FullMap;
