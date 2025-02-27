import { create } from "zustand";

interface SelectedDateState {
  selectedDate: number;
  setSelectedDate: (timestamp: number) => void;
}

const useSelectedDate = create<SelectedDateState>()((set) => ({
  selectedDate: new Date().getTime(),
  setSelectedDate: (timestamp) => set({ selectedDate: timestamp }),
}));

export { useSelectedDate };
