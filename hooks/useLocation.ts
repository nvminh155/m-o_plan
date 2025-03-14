import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useAppStore } from "@/stores/app-store";

export const useLocation = () => {
  const updateAppStore = useAppStore((state) => state.updateAppStore);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  console.log("my location", location?.coords);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Chưa được cấp quyền truy cập vị trí");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      updateAppStore({
        location
      });
    }

    getCurrentLocation();
  }, []);

  return { myLocation: location, errorMsg };
};
