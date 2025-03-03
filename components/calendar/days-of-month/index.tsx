import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import ItemDaysOfMonth, { ITEM_WIDTH } from "./item-days-of-month";
import { useSelectedDate } from "@/stores/selected-date-store";

const daysOfWeek = [
  { id: 0, name: "CN" },
  { id: 1, name: "T2" },
  { id: 2, name: "T3" },
  { id: 3, name: "T4" },
  { id: 4, name: "T5" },
  { id: 5, name: "T6" },
  { id: 6, name: "T7" },
];

interface DaysOfMonthProps {
  month?: number; // min 0 max 11
}

const DaysOfMonth = ({ month }: DaysOfMonthProps) => {
  const updateSelectedDay = useSelectedDate((state) => state.updateDay);

  const flatListRef = useRef<FlatList>(null);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const generateDaysOfWeek = useCallback(() => {
    const today = new Date();

    const length = new Date(
      today.getFullYear(),
      (month ?? today.getMonth()) + 1,
      0
    ).getDate();

    return Array.from({
      length,
    }).map((_, index) => {
      const date = new Date(
        today.getFullYear(),
        month ?? today.getMonth(),
        index + 1
      );

      return {
        name: daysOfWeek[date.getDay()].name,
        day: index + 1,
        isToday: today.getDate() === index + 1,
        id: index + 1,
      };
    });
  }, [month]);

  useEffect(() => {
    if (!flatListRef.current) return;

    const us = setTimeout(() => {
      if (!flatListRef.current) return;
      flatListRef.current.scrollToIndex({
        animated: true,
        index: selectedDay - 1,
      });
    }, 500);

    return () => clearTimeout(us);
  }, []);

  return (
    <View className="mt-node max-h-[100px]">
      <FlatList
        ref={flatListRef}
        className="daysOfMonth"
        data={generateDaysOfWeek()}
        contentContainerClassName="gap-8"
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={({ index }) => {
          console.log("Failed", index);
        }}
        onLayout={() => {
          if (!flatListRef.current) return;
          flatListRef.current.scrollToIndex({
            animated: true,
            index: selectedDay - 1,
          });
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ItemDaysOfMonth
              item={item}
              isSelected={selectedDay ? selectedDay === item.day : null}
              onPressCb={() => {
                setSelectedDay(item.day);
                updateSelectedDay(item.day);
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
