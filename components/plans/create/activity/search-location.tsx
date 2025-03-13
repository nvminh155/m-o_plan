"use client"

import { useState } from "react"
import { View, Text } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { Button, ButtonText } from "@/components/ui/button"
import { CreateLocationModal } from "./create-location-modal"
import { SearchBar } from "@/components/map/search-bar"


interface Location {
  latitude: number
  longitude: number
  address: string
}

export const SearchLocation = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleSearch = async (query: string) => {
    try {
      // For demo purposes, return mock locations near Vung Tau
      const mockLocations: { [key: string]: Location } = {
        "bãi sau": {
          latitude: 10.3354,
          longitude: 107.0871,
          address: "Bãi Sau, Vũng Tàu, Việt Nam",
        },
        "bãi trước": {
          latitude: 10.3477,
          longitude: 107.0766,
          address: "Bãi Trước, Vũng Tàu, Việt Nam",
        },
        "núi nhỏ": {
          latitude: 10.3465,
          longitude: 107.0843,
          address: "Núi Nhỏ, Vũng Tàu, Việt Nam",
        },
        "tượng chúa": {
          latitude: 10.3487,
          longitude: 107.0935,
          address: "Tượng Chúa Kitô, Vũng Tàu, Việt Nam",
        },
        "hồ mây": {
          latitude: 10.3652,
          longitude: 107.0978,
          address: "Hồ Mây, Vũng Tàu, Việt Nam",
        },
      }

      // Find a matching location or default to Vung Tau center
      const lowercaseQuery = query.toLowerCase()
      const matchedLocation = Object.keys(mockLocations).find((key) => key.includes(lowercaseQuery))

      if (matchedLocation) {
        setSelectedLocation(mockLocations[matchedLocation])
      } else {
        // Default to Vung Tau center if no match
        setSelectedLocation({
          latitude: 10.346,
          longitude: 107.084,
          address: "Vũng Tàu, Bà Rịa - Vũng Tàu, Việt Nam",
        })
      }
    } catch (error) {
      console.error("Error searching location:", error)
    }
  }

  return (
    <View className="flex-1">
      <View className="absolute top-4 left-4 right-4 z-10">
        {/* <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          placeholder="Tìm điểm đến"
        /> */}
      </View>

      <MapView
        className="flex-1"
        initialRegion={{
          latitude: 10.346,
          longitude: 107.084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>

      {selectedLocation && (
        <View className="absolute bottom-4 left-4 right-4">
          <View className="bg-white rounded-lg p-4">
            <View className="mb-4">
              <Text className="text-gray-600">Chưa có thông tin địa điểm tại đây</Text>
            </View>
            <Button onPress={() => setIsModalVisible(true)} className="bg-orange-100">
              <ButtonText className="text-orange-500">Đánh dấu điểm đến</ButtonText>
            </Button>
          </View>
        </View>
      )}

      <CreateLocationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        location={selectedLocation}
      />
    </View>
  )
}

