import { LocationObject } from "expo-location";
import { create } from "zustand";

interface Data {
  id: string;
  title: string;
  location: LocationObject | null
  address: string;
}

interface AppStore {
  data: Data;
  updateAppStore: (data: Partial<Data>) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  data: {
    address: "",
    id: "",
    location: null,
    title: "",
  },
  updateAppStore: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
}));
