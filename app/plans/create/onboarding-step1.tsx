import { VStack } from "@/components/ui/vstack";
import React from "react";
import FormInput from "@/components/ui/form-control/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import FormDateTimePicker from "@/components/ui/form-control/form-datetime-picker";

import { planSchema } from "@/schemas/planSchema";
import ButtonNextStep from "@/components/plans/create/button-next-step";
import { useRouter } from "expo-router";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import MapSearch from "@/components/map/map-search";
import { CloseIcon, Icon } from "@/components/ui/icon";

const formSchema = planSchema.pick({
  title: true,
  startDate: true,
  endDate: true,
  budget: true,
  destination: true,
});
type TForm = z.infer<typeof formSchema>;

const OnboardingStep1 = () => {
  const router = useRouter();

  const updateStep1 = useCreatePlanStore((state) => state.updateFormData);
  const updateStep = useCreatePlanStore((state) => state.updateStep);

  const [isShowModalSelectLocation, setIsShowModalSelectLocation] =
    React.useState(false);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: {
        target: 0,
      },
      destination: {
        latitude: 10.3339468,
        longitude: 107.0830519,
        address: "Công Viên Cột Cờ, Vũng Tàu, Việt Nam",
      },
    },
  });

  const onSubmit = (data: TForm) => {
    console.log("MY DATA CREA PLAN", data);
    updateStep1(data);
    updateStep(1);
    router.push("/plans/create/onboarding-step2");
  };

  console.log("FORM", form.getValues());
  return (
    <VStack className={cn("flex-1 rounded-md px-4 relative mt-4")}>
      <FormInput
        control={form.control}
        name="title"
        formLabelProps={{
          text: "Tên chương trình",
        }}
      />
      <FormInput
        control={form.control}
        name="destination.address"
        formLabelProps={{
          text: "Điểm đến của bạn",
        }}
        required
        onFocus={() => setIsShowModalSelectLocation(true)}
        onBlur={() => setIsShowModalSelectLocation(false)}
      />

      <Modal
        isOpen={isShowModalSelectLocation}
        onClose={() => {
          setIsShowModalSelectLocation(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton className="ml-auto">
              <Icon
                as={CloseIcon}
                size="2xl"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody className="">
            <MapSearch
              onComplete={(data) => {
                setIsShowModalSelectLocation(false);
                form.setValue("destination", data);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <FormInput
        control={form.control}
        name="budget.target"
        formLabelProps={{
          text: "Ngân sách",
        }}
        keyboardType="number-pad"
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

export default OnboardingStep1;
