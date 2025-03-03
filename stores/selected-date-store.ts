import { create } from "zustand";

interface SelectedDateState {
  selectedDate: number;
  setSelectedDate: (timestamp: number) => void;
  updateMonth: (month: number) => void;
  updateDay: (day: number) => void;
}

const useSelectedDate = create<SelectedDateState>()((set) => ({
  selectedDate: new Date().getTime(),
  setSelectedDate: (timestamp) => set({ selectedDate: timestamp }),
  updateMonth: (month) => set(state => {

    if(month < 0 || month > 11) throw new Error("Invalid month value! 0-11 only");
    const date = new Date(state.selectedDate);

    date.setMonth(month);
    return { selectedDate: date.getTime() };
  }),
  updateDay: (day) => set(state => {
    const curDate = new Date(state.selectedDate);
    const maxDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();
    if(day < 1 || day > maxDay) throw new Error(`Invalid day value! 1-${maxDay} only`);
    const date = new Date(state.selectedDate);

    date.setDate(day);
    return { selectedDate: date.getTime() };
  }),
}));

export { useSelectedDate };
