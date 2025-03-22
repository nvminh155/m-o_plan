import { useState, useEffect, useRef, useCallback } from "react";

import { VStack } from "@/components/ui/vstack";

import MapScreen from "@/components/map";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import ButtonNextStep from "@/components/plans/create/button-next-step";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "@/schemas/planSchema";
import { z } from "zod";
import BeforeMapScreen from "@/components/plans/create/activity/before-mapscreen";
import MapView, { Marker } from "react-native-maps";
import ListActivity from "@/components/plans/create/activity/list-activity";
import DateOnTrip from "@/components/plans/create/activity/date-on-trip";
import { useRouter } from "expo-router";
import { CreatePlanHeader } from "./_layout";

const formSchema = planSchema.pick({ activities: true });
type TForm = z.infer<typeof formSchema>;

export default function OnboardingStep2() {
  const router = useRouter();

  const formData = useCreatePlanStore((state) => state.formData);
  const updateFormData = useCreatePlanStore((state) => state.updateFormData);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activities: [],
    },
  });
  const { append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "activities", // unique name for your Field Array
  });

  const mapRef = useRef<MapView>(null);

  const [daySelected, setDaySelected] = useState<number | null>(null);

  useEffect(() => {
    if (!daySelected) return;
  }, [daySelected]);

  const onSubmit = (data: TForm) => {
    updateFormData(data);
    router.push("/plans/create/status");
  };

  const convertFormData = useCallback(() => {
    const data = form.getValues("activities");
    if (!data) return [];

    return data.filter((activity) => {
      const a = new Date(activity.onDate);
      const b = new Date(daySelected ?? activity.onDate);
      const isBOnA =
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear();

      return isBOnA;
    });
  }, [formData.activities, daySelected]);

  return (
    <VStack className="flex-1 pt-4">
      <CreatePlanHeader />

      <VStack className="h-auto max-h-[300px] mb-4">
        <MapScreen ref={mapRef} style={{
          aspectRatio: 16 / 9
        }}>
          {convertFormData().map((activity, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: activity.location.latitude,
                  longitude: activity.location.longitude,
                }}
                title={`Điểm ${index + 1}`}
                key={index + 1}
              ></Marker>
            );
          })}
        </MapScreen>
      </VStack>

      <DateOnTrip
        daySelected={daySelected}
        onPressCB={(day) => setDaySelected(day)}
      />

      <ListActivity
        data={convertFormData()}
        onPressActivity={(activity) => {
          mapRef.current?.animateToRegion(
            {
              latitude: activity.location.latitude,
              longitude: activity.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            1000
          );
        }}
      />

      <BeforeMapScreen
        onDate={daySelected ?? formData.startDate}
        onCompleteCreate={(data) => {
          append(
            {
              ...data,
            },
            { shouldFocus: true }
          );
          console.log("data1", data, form.getValues());
        }}
      />
    </VStack>
  );
}
