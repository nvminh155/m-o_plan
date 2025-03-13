import React, { useEffect, useRef } from "react";

import { Button, ButtonText } from "@/components/ui/button";

import { SearchBar } from "@/components/map/search-bar";
import { VStack } from "../ui/vstack";
import MapView, { Marker } from "react-native-maps";
import { TSearchResponse } from "@/services/geoapifyService";

type TComplete = {
  address: string;
  longitude: number;
  latitude: number;
};
interface MapSearchProps {
  onComplete?: (data: TComplete) => void;
  defaultAddress?: TSearchResponse;
}

const MapSearch = ({ onComplete, defaultAddress }: MapSearchProps) => {
  const mapRef = useRef<MapView>(null);

  const [currentAddress, setCurrentAddress] = React.useState<
    TSearchResponse | undefined
  >(defaultAddress);

  useEffect(() => {
    if (!currentAddress) return;
    mapRef.current?.animateToRegion({
      latitude: currentAddress.lat,
      longitude: currentAddress.lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 2000);
  }, [currentAddress]);

  return (
    <VStack className="flex-1 w-full h-[500px] gap-4">
      <SearchBar onSelected={(data) => setCurrentAddress(data)} />
      <MapView
        ref={mapRef}
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
        {currentAddress && (
          <Marker
            coordinate={{
              latitude: currentAddress?.lat,
              longitude: currentAddress?.lon,
            }}
          />
        )}
      </MapView>

      <Button
        onPress={() => {
          if (!currentAddress || !onComplete) return;

          onComplete({
            address: currentAddress?.formatted,
            longitude: currentAddress?.lon,
            latitude: currentAddress?.lat,
          });
        }}
      >
        <ButtonText>Chọn điểm này</ButtonText>
      </Button>
    </VStack>
  );
};

export default MapSearch;
