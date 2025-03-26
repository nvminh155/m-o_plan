"use client";

import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { activities } from "@/data/activities";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonText } from "@/components/ui/button";
import { ActivityInfo } from "@/components/plans/id/schedule/activity-info";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { cn } from "@/lib/cn";

import { usePlanContext } from "@/contexts/PlanProvider";
import { TActivity } from "@/types/plan";
import { MarkerActivity } from "@/components/marker-activity";
import MapScreen from "@/components/map";
import { SearchBar, TSearchComplete } from "@/components/map/search-bar";
import { ConfirmationDialog } from "@/components/map/comfirmation-dialog";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function ScheduleScreen() {
  const { data: planData } = usePlanContext();

  const mapRef = useRef<MapView | null>(null);

  const [searchResult, setSearchResult] = useState<TSearchComplete | undefined>(
    undefined
  );
  const [selectedActivity, setSelectedActivity] = useState<
    TActivity | undefined
  >(undefined);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  // Load completed activities from storage on mount
  useEffect(() => {
    const loadCompletedActivities = async () => {
      try {
        const storedActivities = await AsyncStorage.getItem(
          "completedActivities"
        );
        if (storedActivities) {
          setCompletedActivities(JSON.parse(storedActivities));
        }
      } catch (error) {
        console.error("Failed to load completed activities:", error);
      }
    };

    loadCompletedActivities();
  }, []);

  // Save completed activities to storage when updated
  useEffect(() => {
    const saveCompletedActivities = async () => {
      try {
        await AsyncStorage.setItem(
          "completedActivities",
          JSON.stringify(completedActivities)
        );
      } catch (error) {
        console.error("Failed to save completed activities:", error);
      }
    };

    if (completedActivities.length > 0) {
      saveCompletedActivities();
    }
  }, [completedActivities]);

  const handleMarkerPress = (activity: TActivity) => {
    setSelectedActivity(activity);
  };

  const handleMarkDone = () => {
    if (selectedActivity) {
      if (!completedActivities.includes(selectedActivity.id)) {
        setCompletedActivities([...completedActivities, selectedActivity.id]);
      }
    }
  };

  const isActivityCompleted = (activityId: string) => {
    return completedActivities.includes(activityId);
  };

  const handleSelectSearch = (data: TSearchComplete) => {
    mapRef.current?.animateToRegion({
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0221,
    });
    setSearchResult(data);
    setShowConfirmation(true);
  };

  const handleConfirmDestination = async () => {
    setShowConfirmation(false);
    await updateDoc(doc(db, "plans", planData?.id ?? "???"), {
      activities: arrayUnion({
        type: "other",
        endDate: new Date().toISOString(),
        location: {
          latitude: searchResult?.latitude ?? 0,
          longitude: searchResult?.longitude ?? 0,
          address: searchResult?.address ?? "Unknown",
          name: searchResult?.address ?? "Unknown",
        },
        title: searchResult?.address ?? "Unknown",
        fromHours: 0,
        toHours: 0,
        note: "",
        onDate: 0,
        priority: 0,
        startDate: 0,
        thumbnail: "",
      }),
    });
    setSearchResult(undefined)
  };

  useEffect(() => {
    if (!mapRef || !mapRef.current) return;
    mapRef.current.fitToSuppliedMarkers(
      planData?.activities.map((a, i) => `marker ${i}`) ?? [],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );
  }, [mapRef.current]);

  return (
    <View style={styles.container}>
      <SearchBar onSelected={handleSelectSearch} />
      <MapScreen
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 10.346901,
          longitude: 107.084045,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0221,
        }}
      >
        {planData?.activities.map((activity, i) => (
          <MarkerActivity
            key={i + 1}
            identifier={`marker ${i}`}
            activity={{ ...activity, id: (i+1).toString() }}
            isCompleted={isActivityCompleted(`${planData.id}-${i}`)}
            onPress={handleMarkerPress}
          />
        ))}

        {searchResult && <Marker coordinate={searchResult} />}
      </MapScreen>

      <Box className="bg-white p-4 rounded-lg" style={styles.infoContainer}>
        <ScrollView>
          {selectedActivity ? (
            <ActivityInfo
              activity={selectedActivity}
              isCompleted={isActivityCompleted(selectedActivity.id)}
            />
          ) : (
            <Text className="text-gray-600 font-semibold">
              Chọn một điểm trên bản đồ để xem thông tin
            </Text>
          )}

          {selectedActivity && (
            <Button
              className={cn("mt-4", {
                "bg-primary-300": !isActivityCompleted(selectedActivity.id),
                "bg-gray-400": isActivityCompleted(selectedActivity.id),
              })}
              onPress={handleMarkDone}
              disabled={isActivityCompleted(selectedActivity.id)}
            >
              <ButtonText>
                {isActivityCompleted(selectedActivity.id)
                  ? "Đã hoàn thành"
                  : "Đánh dấu đã đến"}
              </ButtonText>
            </Button>
          )}
        </ScrollView>
      </Box>

      <ConfirmationDialog
        visible={showConfirmation}
        onConfirm={handleConfirmDestination}
        onCancel={() => {
          setShowConfirmation(false);
        }}
        locationName={searchResult?.address || ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
