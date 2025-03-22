import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import FormInput from "@/components/ui/form-control/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { planSchema } from "@/schemas/planSchema";
import { useRouter } from "expo-router";

import {
  FamilyIcon,
  FriendsIcon,
  Icon,
  UserHeartIcon,
  UserIcon,
} from "@/components/ui/icon";
import { CreatePlanHeader } from "./_layout";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import Svg from "react-native-svg";
import { ScrollView } from "react-native";

const formSchema = planSchema.pick({
  type: true,
  numberOfMembers: true,
});
type TForm = z.infer<typeof formSchema>;

const OnboardingKindOfTrip = () => {
  const router = useRouter();

  const updateFormData = useCreatePlanStore((state) => state.updateFormData);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "solo",
      numberOfMembers: 1,
    },
  });

  const onSubmit = (data: TForm) => {
    console.log("MY DATA CREA PLAN", data);
    updateFormData(data);
    router.push("/plans/create/onboarding-budget");
  };

  return (
    <VStack className="flex-1 gap-4">
      <CreatePlanHeader
        onPressCB={() => {
          form.handleSubmit(onSubmit)();
        }}
      />

      <TripType
        onPressCB={(data) => {
          form.setValue("numberOfMembers", data?.amount ?? 0);
          form.setValue("type", data.key as any);
        }}
      />

      <FormInput
        control={form.control}
        name="numberOfMembers"
        formLabelProps={{
          text: "Số người tham gia",
        }}
        keyboardType="number-pad"
      />
    </VStack>
  );
};

type TTripType = {
  icon: React.ForwardRefExoticComponent<React.RefAttributes<Svg>>;
  key: string;
  title: string;
  amount: number;
};

const data: TTripType[] = [
  { icon: UserIcon, key: "solo", title: "Một mình", amount: 1 },
  { icon: UserHeartIcon, key: "partner", title: "Theo cặp", amount: 2 },
  { icon: FriendsIcon, key: "friends", title: "Theo nhóm", amount: -1 },
  { icon: FamilyIcon, key: "family", title: "Gia đình", amount: -1 },
];

type TripTypeProps = {
  onPressCB?: (data: TTripType) => void;
};
const TripType = ({ onPressCB }: TripTypeProps) => {
  const [selectedType, setSelectedType] = useState<TTripType | null>(data[0]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4"
    >
      {data.map((item, i) => {
        return (
          <Pressable
            key={i + 1}
            className={cn(
              "px-2 py-4 border rounded-xl border-gray-200 w-[100px] shrink-0",
              {
                "bg-primary-500 border-0": selectedType?.key === item.key,
              }
            )}
            onPress={() => {
              setSelectedType(item);
              if (onPressCB) onPressCB(item);
            }}
          >
            <Icon
              as={item.icon}
              className={cn("", {
                "text-white": selectedType?.key === item.key,
              })}
              size="lg"
            />
            <Text
              className={cn("font-medium", {
                "text-white": selectedType?.key === item.key,
              })}
            >
              {item.title}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
export default OnboardingKindOfTrip;
