import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { IconAntd } from "../icon";
import AppText from "../ui/AppText";

const month_vi = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const SelectMonth = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<{
    index: IndexPath | IndexPath[];
    value: string;
  }>({
    index: new IndexPath(0),
    value: month_vi[0],
  });

  return (
    <View className="flex-1 max-w-[150px]">
      <Select
        className="roundd"
        value={
          <View className="flex-row gap-2">
            <IconAntd name="calendar" size={15} className="!text-accent" />
            <AppText>{selectedIndex.value}</AppText>
          </View>
        }
        selectedIndex={selectedIndex.index}
        onSelect={(i) => {
          setSelectedIndex({
            index: i,
            value: month_vi[i.row],
          });
        }}
      >
        {month_vi.map((month, i) => (
          <SelectItem title={month} key={i + 1} />
        ))}
      </Select>
    </View>
  );
};

export default SelectMonth;
