import DaysOfMonth from "@/components/calendar/days-of-month";

import { Button } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import Wrapper from "@/components/ui/Wrapper";
import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";

import SelectMonth from "@/components/calendar/select-month";

import { IconAntd } from "@/components/icon";
import ActivityOnCalendar from "@/components/activity/activity-on-calendar";

const hoursOfDay = [
  "00 am",
  "01 am",
  "02 am",
  "03 am",
  "04 am",
  "05 am",
  "06 am",
  "07 am",
  "08 am",
  "09 am",
  "10 am",
  "11 am",
  "12 pm",
  "13 pm",
  "14 pm",
  "15 pm",
  "16 pm",
  "17 pm",
  "18 pm",
  "19 pm",
  "20 pm",
  "21 pm",
  "22 pm",
  "23 pm",
];

const timeOfDay = ["Sáng", "Chiều", "Tối"];

const CalendarScreen = () => {
  const generateHoursOfDay = useCallback(() => {
    return hoursOfDay.map((hour) => hour);
  }, []);

  return (
    <Wrapper className="flex flex-col h-full relative">
      <View className="flex-row items-center justify-between">
        <Button
          size="lg"
          action={"secondary"}
          className="rounded-full !px-[.55rem]"
        >
          <IconAntd name="close" className="!text-typography-800" />
        </Button>

        <View className="flex-row gap-2 flex-1 justify-end">
          <Button
            size="lg"
            action={"secondary"}
            className="rounded-full !px-[.55rem]"
          >
            <IconAntd name="search1" className="!text-typography-800" />
          </Button>

          <SelectMonth />
        </View>
      </View>

      <View
        className="flex-1"
        style={{
          paddingBottom: 40,
        }}
      >
        <DaysOfMonth />

        <ScrollView contentContainerClassName="gap-16" className="mt-10">
          {generateHoursOfDay().map((hour, i) => (
            <View key={i + 1} className="flex-row items-start gap-3">
              <AppText className="font-medium text-tertiary-500">
                {hour}
              </AppText>
              <ActivityOnCalendar
                data={{
                  id: "12321",
                  title: "Traveling to Switzerland",
                  description: "Traveling to Switzerland",
                  startDate: new Date().getTime(),
                  endDate: new Date().getTime(),
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </Wrapper>
  );
};

export default CalendarScreen;
