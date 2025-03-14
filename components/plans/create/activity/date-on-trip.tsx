import { ScrollView } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";

import { useCreatePlanStore } from "@/stores/create-plans-store";
interface DateOnTripProps {
  daySelected: number | null;
  onPressCB: (day: number) => void;
}

const DateOnTrip = ({ daySelected, onPressCB }: DateOnTripProps) => {
  const formData = useCreatePlanStore((state) => state.formData);

  const numberOfDays = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const numberOfDays =
      Math.abs(
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      ) + 1;

    return numberOfDays;
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("vi-vn", { month: "short", day: "numeric" });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-4"
      className="!h-auto py-2 grow-0"
    >
      {Array.from({ length: numberOfDays() }, (_, i) => {
        const start = new Date(formData.startDate);
        const day = new Date(formData.startDate);
        day.setDate(start.getDate() + i);

        return (
          <Button
            key={i + 1}
            action={
              day.getTime() === daySelected || (!daySelected && i === 0)
                ? "primary"
                : "secondary"
            }
            className="rounded-full"
            onPress={() => {
              console.log('da', day.getTime())
              if (onPressCB) onPressCB(day.getTime());
            }}
          >
            <ButtonText>{formatDate(day)}</ButtonText>
          </Button>
        );
      })}
    </ScrollView>
  );
};

export default DateOnTrip;
