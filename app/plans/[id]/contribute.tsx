import AppImage from "@/components/image/AppImage";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import FormInput from "@/components/ui/form-control/form-input";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number().positive(),
  note: z.string().min(1).max(200),
});

type TForm = z.infer<typeof formSchema>;

const ContributeScreen = () => {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      note: "",
    },
  });

  const handleSubmit = (data: TForm) => {
    console.log("submit gop quy", data);
  };

  return (
    <VStack className="flex-1 relative">
      <HStack className="mt-4 absolute top-4 z-10 w-full gap-4" style={{}}>
        <Button
          className="rounded-full blur-lg bg-white/90"
          style={{
            boxShadow: "0px 4px 200px rgba(0, 0, 0, 0.25)",
          }}
        >
          <ButtonIcon as={ArrowLeftIcon} className="text-black" />
        </Button>
        <Text className="font-semibold">Góp quỹ</Text>
      </HStack>
      <AppImage
        source={require("@/assets/images/hoaanhdao_banner.jpg")}
        className="h-[150px] w-full"
      />
      <VStack className="bg-white mx-4 p-4 py-8 gap-4 rounded-2xl -mt-20">
        <HStack className="justify-between">
          <Text className="text-gray-400" size="sm">
            Số dư quỹ
          </Text>
          <Text className="font-medium">20000đ</Text>
        </HStack>

        <VStack className="form gap-4">
          <FormInput
            control={form.control}
            name="amount"
            formLabelProps={{
              text: "Số tiền",
            }}
            keyboardType="number-pad"
            required
          />
          <FormInput
            control={form.control}
            name="note"
            formLabelProps={{
              text: "Ghi chú",
            }}
            placeholder="Nhập ghi chú"
            required
          />
        </VStack>
      </VStack>

      <VStack className="bg-white absolute bottom-0 left-0 right-0 p-4">
        <Button
          className="rounded-xl h-auto py-4"
          onPress={() => {
            form.handleSubmit(handleSubmit)();
          }}
        >
          <ButtonText>Góp quỹ</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export default ContributeScreen;
