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
import { activitySchema } from "@/schemas/planSchema";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ListRenderItemInfo, FlatList } from "react-native";
import { z } from "zod";
import ButtonNextStep from "./button-next-step";
import { PlusIcon } from "@/components/ui/icon";

type TForm = z.infer<typeof activitySchema> & {
  id?: string;
};

interface FormCreateActivityProps {
  isShow?: boolean;
}

const FormCreateActivity = ({ isShow }: FormCreateActivityProps) => {
  const updateActivities = useCreatePlanStore((state) => state.updateFormData);
  const updateStep = useCreatePlanStore((state) => state.updateStep);

  const [formData, setFormData] = React.useState<TForm[]>([]);

  const updateFormData = (id: string, data: TForm) => {
    setFormData((prev) => prev.map((i) => (i.id === id ? data : i)));
  };

  const deleteFormData = (id: string | undefined) => {
    if (!id) return;
    setFormData((prev) => prev.filter((i) => i.id !== id));
  };

  const renderActivityForm = ({ item }: ListRenderItemInfo<TForm>) => {
    return (
      <FormCreate
        initData={item}
        key={item.id}
        onChangeForm={(data) => {
          if (item.id) updateFormData(item.id, data);
          console.log(formData);
        }}
        onDelete={() => deleteFormData(item.id)}
      />
    );
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
            setFormData([
              ...formData,
              {
                id: String(formData.length),
                description: "",
                title: "",
                endDate: 0,
                startDate: 0,
              },
            ]);
          }}
          className="ml-auto"
        >
          <ButtonText>Thêm mới</ButtonText>
          <ButtonIcon as={PlusIcon} />
        </Button>
        <FlatList data={formData} renderItem={renderActivityForm} />
      </VStack>

      <ButtonNextStep
        onNext={() => {
          updateStep(1);
          updateActivities(formData);
        }}
      />
    </VStack>
  );
};

interface FormCreateProps {
  initData: TForm;
  onDelete?: () => void;
  onChangeForm?: (data: TForm) => void;
}

const FormCreate = ({ initData, onDelete, onChangeForm }: FormCreateProps) => {
  const form = useForm<TForm>({
    resolver: zodResolver(activitySchema),
    defaultValues: initData,
  });

  const onSubmit = (data: TForm) => {
    if (onChangeForm) onChangeForm(data);
  };

  return (
    <VStack>
      <FormInput
        control={form.control}
        name="title"
        formLabelProps={{
          text: "Tên hoạt động",
        }}
      />

      <FormInput
        control={form.control}
        name="description"
        formLabelProps={{
          text: "Mô tả",
        }}
      />

      <FormDateTimePicker
        control={form.control}
        name="startDate"
        formLabelProps={{
          text: "Ngày bắt đầu",
        }}
      />
      <FormDateTimePicker
        control={form.control}
        name="endDate"
        formLabelProps={{
          text: "Ngày kết thúc",
        }}
      />

      <ButtonGroup flexDirection="row" className="ml-auto">
        <Button
          action="negative"
          onPress={() => {
            if (onDelete) onDelete();
          }}
        >
          <ButtonText>Xóa</ButtonText>
        </Button>
        <Button action="primary" onPress={form.handleSubmit(onSubmit)}>
          <ButtonText>Lưu</ButtonText>
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export default FormCreateActivity;
