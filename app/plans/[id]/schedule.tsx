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
import { Activity } from "@/types/fake/activity";
import { CustomMarker } from "@/components/calendar/schedule/custom-marker";

export default function ScheduleScreen() {
  const mapRef = useRef<MapView | null>(null);

  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
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

  const handleMarkerPress = (activity: Activity) => {
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

  useEffect(() => {
    if (!mapRef || !mapRef.current) return;
    mapRef.current.fitToSuppliedMarkers(["marker 0"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [mapRef.current]);

  return (
    <View style={styles.container}>
      <MapView
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
        {activities.map((activity, i) => (
          <CustomMarker
            key={i + 1}
            identifier={`marker ${i}`}
            activity={activity}
            isCompleted={isActivityCompleted(activity.id)}
            onPress={handleMarkerPress}
          />
        ))}
      </MapView>

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
                  : "Mark done"}
              </ButtonText>
            </Button>
          )}
        </ScrollView>
      </Box>
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
