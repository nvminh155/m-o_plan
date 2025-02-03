import { VStack } from "@/components/ui/vstack";
import React from "react";
import FormInput from "@/components/ui/form-control/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import FormDateTimePicker from "@/components/ui/form-control/form-datetime-picker";
import ButtonNextStep from "./button-next-step";
import { step1Schema } from "@/schemas/planSchema";

const formSchema = step1Schema;

type TForm = z.infer<typeof formSchema>;

interface FormStep1Props {
  isShow?: boolean;
}
const FormStep1 = ({ isShow }: FormStep1Props) => {
  const updateStep1 = useCreatePlanStore((state) => state.updateFormData);
  const updateStep = useCreatePlanStore((state) => state.updateStep);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: TForm) => {
    console.log("MY DATA CREA PLAN", data);
    updateStep1(data);
    updateStep(1);
  };

  return (
    <VStack
      className={cn("flex-1 rounded-md", {
        hidden: !isShow,
      })}
    >
      <FormInput
        control={form.control}
        name="title"
        formLabelProps={{
          text: "Tên kế hoạch",
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

      <ButtonNextStep
        onNext={() => {
          form.handleSubmit(onSubmit, () => {})();
        }}
      />
    </VStack>
  );
};

export default FormStep1;
