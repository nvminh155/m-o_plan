import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";
import { useDestinationStore } from "@/stores/destination-store";

import * as Location from "expo-location";

import { ConfirmationDialog } from "@/components/plans/create/activity/confirmation-dialog";
import { SearchBar } from "@/components/map/search-bar";
import { VStack } from "@/components/ui/vstack";
import { CreateLocationModal } from "@/components/plans/create/activity/create-location-modal";

type SearchResult = {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { destinations, addDestination } = useDestinationStore();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Simulating a search API call
      // In a real app, you would use a geocoding service like Google Places API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock search result
      const result = {
        name: query,
        latitude: region.latitude + (Math.random() - 0.5) * 0.05,
        longitude: region.longitude + (Math.random() - 0.5) * 0.05,
        address: `123 ${query} Street, City, Country`,
      };

      setSearchResult(result);

      // Check if this location exists in our destinations
      const exists = destinations.some(
        (dest) =>
          Math.abs(dest.latitude - result.latitude) < 0.0001 &&
          Math.abs(dest.longitude - result.longitude) < 0.0001
      );

      // Move map to the search result
      mapRef.current?.animateToRegion({
        latitude: result.latitude,
        longitude: result.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // If location doesn't exist, show confirmation dialog
      if (!exists) {
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDestination = () => {
    setShowConfirmation(false);
    setShowFormModal(true);
  };

  const handleCancelDestination = () => {
    setShowConfirmation(false);
  };

  const handleFormSubmit = (data: any) => {
    if (searchResult) {
      addDestination({
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        category: data.category,
        latitude: searchResult.latitude,
        longitude: searchResult.longitude,
        address: searchResult.address,
        images: data.images || [],
      });
    }
    setShowFormModal(false);
  };

  return (
    <VStack className="flex-1">
      <View style={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {searchResult && (
          <Marker
            coordinate={{
              latitude: searchResult.latitude,
              longitude: searchResult.longitude,
            }}
            title={searchResult.name}
            description={searchResult.address}
          />
        )}

        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title={destination.name}
            description={destination.description}
            pinColor="blue"
          />
        ))}
      </MapView>

      <ConfirmationDialog
        visible={showConfirmation}
        onConfirm={handleConfirmDestination}
        onCancel={handleCancelDestination}
        locationName={searchResult?.name || ""}
      />

      {/* <DestinationFormModal
        visible={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={{
          name: searchResult?.name || "",
          address: searchResult?.address || "",
        }}
      /> */}

      <CreateLocationModal
        isVisible={showFormModal}
        onClose={() => setShowFormModal(false)}
        // onSubmit={handleFormSubmit}
        // initialData={{
        //   name: searchResult?.name || "",
        //   address: searchResult?.address || "",
        // }}
        location={searchResult}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 5,
  },
});
