import { create } from "zustand"

interface Location {
  id: string
  title: string
  latitude: number
  longitude: number
  address: string
  user1Activity: string
  user2Activity: string
}

interface LocationStore {
  locations: Location[]
  addLocation: (location: Omit<Location, "id">) => void
  removeLocation: (id: string) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  addLocation: (location) =>
    set((state) => ({
      locations: [...state.locations, { ...location, id: Math.random().toString() }],
    })),
  removeLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((location) => location.id !== id),
    })),
}))

