import DaysOfMonth from "@/components/calendar/days-of-month";

import { Button } from "@/components/ui/button";
import AppText from "@/components/ui/AppText";
import Wrapper from "@/components/ui/Wrapper";
import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";

import SelectMonth from "@/components/calendar/select-month";

import { IconAntd } from "@/components/icon";
import ActivityOnCalendar from "@/components/activity/activity-on-calendar";
import { useActivityByUserIdQuery } from "@/hooks/query/useActivityByUserIdQuery";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useSelectedDate } from "@/stores/selected-date-store";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { toTime } from "@/utils/datetime/to-time";

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ArrowDownIcon } from "@/components/ui/icon";

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

const Header = () => {
  return (
    <View className="flex-row items-center justify-between">
      <Button
        size="lg"
        action={"secondary"}
        className="rounded-full !px-[.55rem]"
      >
        <IconAntd name="close" className="!text-typography-800" />
      </Button>
      <SelectNewMonth />
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
  );
};

const SelectNewMonth = () => {
  const updateMonth = useSelectedDate((state) => state.updateMonth);

  return (
    <Select
      onValueChange={(e) => {
        console.log("e", e);
        updateMonth(Number(e));
      }}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" />
        <SelectIcon className="mr-3" as={ArrowDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <ScrollView>
          {Array.from({ length: 13 }).map((_, i) => (
            <SelectItem
              key={i + 1}
              label={`Tháng ${i + 1}`}
              value={`${i}`}
            />
          ))}
          </ScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
const CalendarScreen = () => {
  const generateHoursOfDay = useCallback(() => {
    return hoursOfDay.map((hour) => hour);
  }, []);

  return (
    <Wrapper className="flex flex-col h-full relative">
      <Header />
      <View
        className="flex-1"
        style={{
          paddingBottom: 40,
        }}
      >
        <DaysOfMonth />

        {/* <ScrollView contentContainerClassName="gap-16" className="mt-10">
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
                  fromHours: 0,
                  toHours: 0,
                }}
              />
            </View>
          ))}
        </ScrollView> */}

        <ListActivity />
      </View>
    </Wrapper>
  );
};

interface ListActivityProps {
  currentDateTimestamp: number;
}

const ListActivity = () => {
  const { user } = useAuthContext();
  const selectedDay = useSelectedDate((state) => state.selectedDate); // timestamp only

  const query = useActivityByUserIdQuery(user.id, selectedDay); // ok

  console.log("data activies", query.data);
  return (
    <ScrollView contentContainerClassName="gap-16" className="mt-10">
      {query.data?.map((activity, i) => {
        const fromHours = new Date(activity.fromHours);
        const endDate = new Date(activity.endDate);

        const fromHoursString = toTime(fromHours.getTime());

        return (
          <View key={i + 1} className="flex-row items-start gap-3">
            <AppText className="font-medium text-tertiary-500">
              {fromHoursString}
            </AppText>
            <ActivityOnCalendar data={{ ...activity, id: `${i + 1}` }} />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default CalendarScreen;
