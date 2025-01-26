import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import ItemDaysOfMonth, { ITEM_WIDTH } from "./item-days-of-month";

const daysOfWeek = [
  { id: 0, name: "CN" },
  { id: 1, name: "T2" },
  { id: 2, name: "T3" },
  { id: 3, name: "T4" },
  { id: 4, name: "T5" },
  { id: 5, name: "T6" },
  { id: 6, name: "T7" },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Current month (0-based index)

  const firstDay = new Date(year, month, 1); // First day of the current month
  return firstDay.getDay(); // Returns 0 (Sunday) to 6 (Saturday)
}

interface DaysOfMonthProps {
  month?: number;
}

const DaysOfMonth = ({ month }: DaysOfMonthProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const generateDaysOfWeek = useCallback(() => {
    const currentDate = new Date();

    const firstDay = getFirstDayOfWeek();

    return Array.from({
      length:
        getDaysInMonth(
          currentDate.getFullYear(),
          month ?? currentDate.getMonth()
        ) + firstDay,
    }).map((_, index) => ({
      name: daysOfWeek[index % 7].name,
      day: index - firstDay + 1,
      isLastMonth: index < firstDay,
      isToday: currentDate.getDate() === index - firstDay + 1,
      id: index,
    }));
  }, [month]);

  useEffect(() => {
    if (!flatListRef.current) return;

    flatListRef.current.scrollToIndex({
      animated: true,
      index: new Date().getDate() + getFirstDayOfWeek(),
    });
  }, []);

  return (
    <View className="mt-node max-h-[100px]">
      <FlatList
        ref={flatListRef}
        className="daysOfMonth"
        data={generateDaysOfWeek()}
        contentContainerClassName="gap-8"
        onScrollToIndexFailed={({ index }) => {
          console.log("Failed", index);
        }}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={7}
        renderItem={({ item }) => {
          return (
            <ItemDaysOfMonth
              item={item}
              isSelected={selectedDay ? selectedDay === item.day : null}
              onPressCb={() => {
                setSelectedDay(item.day);
              }}
            />
          );
        }}
        horizontal
      />
    </View>
  );
};

export default memo(DaysOfMonth);
