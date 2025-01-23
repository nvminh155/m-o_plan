import DaysOfMonth from "../../components/calendar/days-of-month";
import { IconAntd } from "../../components/icon";
import AppButton from "../../components/ui/AppButton";
import AppText from "../../components/ui/AppText";
import Wrapper from "../../components/ui/Wrapper";
import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";

import CardActivityInSchedule from "../../components/calendar/schedule/card-activity-schedule";
import SelectMonth from "../../components/calendar/select-month";

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
        <AppButton variant="ghost" size="icon">
          <IconAntd name="close" className="!text-accent" />
        </AppButton>

        <View className="flex-row gap-2 flex-1 justify-end">
          <AppButton variant="ghost" size="icon">
            <IconAntd name="search1" className="!text-accent " />
          </AppButton>

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
              <AppText className="font-medium text-accent/60">{hour}</AppText>
              <CardActivityInSchedule />
            </View>
          ))}
        </ScrollView>
      </View>

      <AppButton
        variant="primary"
        size="icon"
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
      >
        <IconAntd name="plus" className="!text-primary-foreground" size={24} />
      </AppButton>
    </Wrapper>
  );
};

export default CalendarScreen;
