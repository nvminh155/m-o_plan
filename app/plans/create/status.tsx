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
import { tripadvisorService } from "@/services/tripadvisor";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { PlanSchema, TPlan } from "@/types/plan";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface CreateStatusScreenProps {}

type PendingScreenprops = {
  text?: string;
};
const PendingScreen = ({ text }: PendingScreenprops) => {
  return (
    <VStack className="justify-center flex-1">
      <VStack className="items-center">
        <View className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full">
          <Spinner size={"large"} />
        </View>
        <Text size="xl" className="font-semibold">
          {text ?? "Đang tạo dựa trên dữ liệu của bạn..."}
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

  const formData = useCreatePlanStore((state) => state.formData);
  const [qrValue, setQRValue] = useState("");
  const [message, setMessage] = useState(
    "Đang tạo dựa trên dữ liệu của bạn..."
  );

  const mutation = useMutation({
    mutationFn: async (data: PlanSchema) => {
      const curDate = new Date();
      setMessage("Đang tìm những địa điểm nên ghé thăm...");
      const thingsToDo = await tripadvisorService.attraction.list({
        geoId: 303946,
        startDate: `2025-03-${curDate.getDate()}`,
        endDate: `2025-03-${curDate.getDate() + 2}`,
      });

      setMessage("Đang tạo kế hoạch...");

      const activities1 = thingsToDo.payload
        .filter((item) => item.__typename === "AppPresentation_SingleCard")
        .map((item, i) => {
          return {
            thumbnail: "",
            startDate: 0,
            endDate: 0,
            fromHours: 0,
            toHours: 0,
            note: "",
            onDate: 0,
            priority: i,
            title: item.listSingleCardContent.cardTitle.string,
            type: "other",
            location: {
              name: item.listSingleCardContent.cardTitle.string,
              address: "",
              latitude: item.geoCode.latitude,
              longitude: item.geoCode.longitude,
            },
             
          };
        }) as TPlan["activities"];


        console.log("activities", activities1);
      return planService.createPlan({ ...data, activities: activities1 }, user.id);
    },
    onSuccess(res) {
      console.log("SUCCESS CREATE PLAN", res);
      setQRValue(res.data.inviteCode);
    },
    onError(error) {
      console.log("ERROR CREATE PLAN", error);
      setMessage("Có lỗi xảy ra, vui lòng thử lại");
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
      {(mutation.isIdle || mutation.isPending) && (
        <PendingScreen text={message} />
      )}
      {mutation.isSuccess && <DoneScreen qrValue={qrValue} />}
    </VStack>
  );
};

export default CreateStatusScreen;
