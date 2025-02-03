import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import FormDateTimePicker from "@/components/ui/form-control/form-datetime-picker";
import FormInput from "@/components/ui/form-control/form-input";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/lib/cn";
import { planSchema } from "@/schemas/planSchema";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { ListRenderItemInfo, FlatList } from "react-native";
import { z } from "zod";
import ButtonNextStep from "./button-next-step";
import { PlusIcon } from "@/components/ui/icon";

const formSchema = planSchema.pick({
  activities: true,
});
type TForm = z.infer<typeof formSchema>;

type TActivity = FieldArrayWithId<
  {
    activities: {
      endDate: number;
      title: string;
      description: string;
      startDate: number;
    }[];
  },
  "activities",
  "id"
>;

interface FormCreateActivityProps {
  isShow?: boolean;
}

const FormCreateActivity = ({ isShow }: FormCreateActivityProps) => {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activities: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "activities", // unique name for your Field Array
  });

  const updateActivities = useCreatePlanStore((state) => state.updateFormData);
  const updateStep = useCreatePlanStore((state) => state.updateStep);

  const renderActivityForm = ({
    item,
    index,
  }: ListRenderItemInfo<TActivity>) => {
    return (
      <VStack key={item.id}>
        <FormInput
          control={form.control}
          name={`activities.${index}.title`}
          formLabelProps={{
            text: "Tên hoạt động",
          }}
        />

        <FormInput
          control={form.control}
          name={`activities.${index}.description`}
          formLabelProps={{
            text: "Mô tả",
          }}
        />

        <FormDateTimePicker
          control={form.control}
          name={`activities.${index}.startDate`}
          formLabelProps={{
            text: "Ngày bắt đầu",
          }}
        />
        <FormDateTimePicker
          control={form.control}
          name={`activities.${index}.endDate`}
          formLabelProps={{
            text: "Ngày kết thúc",
          }}
        />

        <ButtonGroup flexDirection="row" className="ml-auto">
          <Button
            action="negative"
            onPress={() => {
              remove(index);
            }}
          >
            <ButtonText>Xóa</ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    );
  };

  const onSubmit = (data: TForm) => {
    updateActivities(data.activities);
    updateStep(1);
  };

  return (
    <VStack
      className={cn("flex-1", {
        hidden: !isShow,
      })}
    >
      <VStack className="flex-1 mb-4">
        <Button
          size="sm"
          onPress={() => {
            append({
              description: "",
              title: "",
              endDate: 0,
              startDate: 0,
            });
          }}
          className="ml-auto"
        >
          <ButtonText>Thêm mới</ButtonText>
          <ButtonIcon as={PlusIcon} />
        </Button>

        <FlatList data={fields} renderItem={renderActivityForm} />
      </VStack>

      <ButtonNextStep onNext={form.handleSubmit(onSubmit)} />
    </VStack>
  );
};

export default FormCreateActivity;
