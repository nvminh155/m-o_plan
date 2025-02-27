import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { CopyIcon, DownloadIcon, Icon, TickIcon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuthContext } from "@/contexts/AuthProvider";
import { cn } from "@/lib/cn";
import { planService } from "@/services/planService";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { PlanSchema, TPlan } from "@/types/plan";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface CreateStatusScreenProps {}

const PendingScreen = () => {
  return (
    <VStack className="justify-center flex-1">
      <VStack className="items-center">
        <View className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full">
          <Spinner size={"large"} />
        </View>
        <Text size="xl" className="font-semibold">
          Đang tạo ...
        </Text>
      </VStack>
    </VStack>
  );
};

interface DoneScreenProps {
  qrValue: string;
}

const DoneScreen = ({ qrValue }: DoneScreenProps) => {
  return (
    <VStack className="justify-center flex-1 gap-12">
      <VStack className="items-center">
        <View className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full">
          <Icon as={TickIcon} className="text-success-300 w-20 h-20" />
        </View>
        <Text size="xl" className="font-semibold">
          Tạo hoàn tất
        </Text>
      </VStack>

      <VStack space="md" className="items-center gap-12">
        <QRCode value={qrValue} size={300} />
        <ButtonGroup flexDirection="row">
          <Button>
            <ButtonText>Sao chép mã</ButtonText>
            <ButtonIcon as={CopyIcon} />
          </Button>

          <Button>
            <ButtonText>Lưu ảnh QR</ButtonText>
            <ButtonIcon as={DownloadIcon} />
          </Button>
        </ButtonGroup>
      </VStack>

      <HStack className="items-center gap-2 justify-center">
        <Text>Xem kế hoạch đã tạo</Text>
        <Button
          variant="link"
          action="primary"
          onPress={() => {
            router.replace({
              pathname: "/plans/[id]",
              params: {
                id: qrValue,
              },
            });
          }}
        >
          <ButtonText>tại đây</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};
const CreateStatusScreen = ({}: CreateStatusScreenProps) => {
  const { user } = useAuthContext();
  const updateStep = useCreatePlanStore((state) => state.updateStep);
  const formData = useCreatePlanStore((state) => state.formData);
  const [qrValue, setQRValue] = useState("");

  const mutation = useMutation({
    mutationFn: (data: PlanSchema) => {
      return planService.createPlan(data, user.id);
    },
    onSuccess(res) {
      console.log("SUCCESS CREATE PLAN", res);
      setQRValue(res.data.inviteCode);
    },
    onError(error) {
      console.log("ERROR CREATE PLAN", error);
      updateStep(-1);
    },
  });

  useEffect(() => {
    console.log("formDa", formData);
    mutation.mutate(formData);
  }, []);

  console.log(
    "MUTATION",
    mutation.isIdle,
    mutation.isPending,
    mutation.isSuccess
  );

  return (
    <VStack className="flex-1">
      {(mutation.isIdle || mutation.isPending) && <PendingScreen />}
      {mutation.isSuccess && <DoneScreen qrValue={qrValue} />}
    </VStack>
  );
};

export default CreateStatusScreen;
