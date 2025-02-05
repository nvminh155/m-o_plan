import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import FormInput from "@/components/ui/form-control/form-input";
import { VStack } from "@/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormDateTimePicker from "@/components/ui/form-control/form-datetime-picker";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { piggyBankSchema } from "@/schemas/planSchema";
import { cn } from "@/lib/cn";
import ButtonNextStep from "./button-next-step";

const formSchema = piggyBankSchema;

type TForm = z.infer<typeof formSchema>;

interface FormCreatePiggyBankProps {
  isShow?: boolean;
}

const FormCreatePiggyBank = ({ isShow }: FormCreatePiggyBankProps) => {
  const updatePiggyBank = useCreatePlanStore((state) => state.updateFormData);
  const updateStep = useCreatePlanStore((state) => state.updateStep);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountGoal: 0,
      amountPeriod: 0,
      periodDay: 1,
      endDate: 0,
    },
  });

  // useUpdateCreatePlan("piggy-bank", () => {
  //   form.handleSubmit(onSubmit, () => {
  //     updatePiggyBank(null);
  //   })();
  // });

  const onSubmit = (data: TForm) => {
    console.log("MY DATA CREA PLAN PIGGY", data);
    updatePiggyBank({ piggyBank: data });
    updateStep(1);
  };

  return (
    <VStack
      space="md"
      className={cn("flex-1", {
        hidden: !isShow,
      })}
    >
      <FormInput
        control={form.control}
        name="amountGoal"
        keyboardType="number-pad"
        formLabelProps={{
          text: "Số tiền cần tiết kiệm",
        }}
      />
      <FormInput
        control={form.control}
        name="amountPeriod"
        keyboardType="number-pad"
        formLabelProps={{
          text: "Số tiền gửi định kỳ",
        }}
      />

      <FormInput
        control={form.control}
        name="periodDay"
        keyboardType="number-pad"
        formLabelProps={{
          text: "Ngày góp tiền mỗi tháng",
        }}
      />

      <FormDateTimePicker
        control={form.control}
        name="endDate"
        formLabelProps={{
          text: "Ngày hết hạn",
        }}
        helperText="Nhấp vào ô để chọn ngày"
      />

      <ButtonGroup flexDirection="row" className="ml-auto">
        <Button action="secondary">
          <ButtonText>Để sau</ButtonText>
        </Button>
      </ButtonGroup>

      <ButtonNextStep
        onNext={() => {
          form.handleSubmit(onSubmit, () => {})();
        }}
      />
    </VStack>
  );
};

export default FormCreatePiggyBank;
