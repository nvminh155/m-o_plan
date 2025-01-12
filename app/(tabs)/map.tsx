import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapNative = () => {
  const [isReload, setIsReload] = useState(false);

  const markers = [
    {
      id: "1",
      latitude: -27,
      longitude: 2,
      title: "my location",
    },
    {
      id: "2",
      latitude: 13.430658248624479,
      longitude: 107.88409732282162,
      title: "1my location",
    },
    {
      id: "3",
      latitude: 10.9666,
      longitude: 106.6498,
      title: "my location",
    },
  ];
  return (
    <View className="flex flex-col h-full">
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
        />
      </MapView>

      <Button title="reload map" onPress={() => setIsReload(!isReload)} />
    </View>
  );
};

export default MapNative;
