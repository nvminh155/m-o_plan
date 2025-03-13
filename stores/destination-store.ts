import { create } from "zustand"
import { persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type Destination = {
  id: string
  name: string
  description: string
  category: string
  latitude: number
  longitude: number
  address: string
  images: string[]
}

type DestinationStore = {
  destinations: Destination[]
  addDestination: (destination: Destination) => void
  updateDestination: (id: string, destination: Partial<Destination>) => void
  removeDestination: (id: string) => void
}

export const useDestinationStore = create<DestinationStore>()(
  persist(
    (set) => ({
      destinations: [],
      addDestination: (destination) =>
        set((state) => ({
          destinations: [...state.destinations, destination],
        })),
      updateDestination: (id, updatedDestination) =>
        set((state) => ({
          destinations: state.destinations.map((dest) => (dest.id === id ? { ...dest, ...updatedDestination } : dest)),
        })),
      removeDestination: (id) =>
        set((state) => ({
          destinations: state.destinations.filter((dest) => dest.id !== id),
        })),
    }),
    {
      name: "destination-storage",
    },
  ),
)

