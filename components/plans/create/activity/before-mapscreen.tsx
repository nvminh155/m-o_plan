import { useState } from "react";

import { VStack } from "@/components/ui/vstack";
import MapSearch from "@/components/map/map-search";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import {
  BedIcon,
  CameraIcon,
  CloseIcon,
  Icon,
  MapPinIcon,
  PlaneIcon,
  UtensilsIcon,
} from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { TActivity } from "@/types/plan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema } from "@/schemas/planSchema";
import FormInput from "@/components/ui/form-control/form-input";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import FormClockPicker from "@/components/ui/form-control/form-clock.picker";

type TBeforeMapScreen = {
  onDate: number;
  onCompleteCreate?: (value: TActivity) => void;
};

const BeforeMapScreen = ({ onDate, onCompleteCreate }: TBeforeMapScreen) => {
  const form = useForm<TActivity>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      onDate,
    },
  });

  const [isShowTypeActivity, setIsShowTypeActivity] = useState(false);
  const [typeActivity, setTypeActivity] = useState<{
    key: "food" | "hotel" | "transport" | "photography" | "other";
    label: string;
  } | null>(null);

  const actions = [
    { icon: CameraIcon, label: "Chụp ảnh", key: "photography" },
    { icon: BedIcon, label: "Lưu trú", key: "hotel" },
    { icon: UtensilsIcon, label: "Ẩm thực", key: "food" },
    { icon: MapPinIcon, label: "Địa điểm", key: "other" },
    { icon: PlaneIcon, label: "Du lịch", key: "transport" },
  ];

  const onSubmit = (data: TActivity) => {
    console.log("data activity", data);
    if (onCompleteCreate) onCompleteCreate({...data, onDate});
    setTypeActivity(null);
  };

  return (
    <VStack className="h-20 relative">
      <Modal isOpen={!!typeActivity} onClose={() => setTypeActivity(null)}>
        <ModalBackdrop />

        <ModalContent className="h-[80%]">
          <ModalHeader>
            <Heading size="lg">{typeActivity?.label}</Heading>
            <ModalCloseButton className="ml-auto">
              <Icon
                as={CloseIcon}
                size="2xl"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody className="h-auto">
            <VStack className="h-[300px] max-h-[300px]">
              {/* chỗ này cho hiện một số điểm đến (tự generate ra) và một cái button tự chọn điểm đến (cái này thì show map ra) */}
              <MapSearch
                onSelected={(data) => {
                  form.setValue("location", {
                    latitude: data.lat,
                    longitude: data.lon,
                  });
                }}
              ></MapSearch>

              <HStack>
                {form.getFieldState("location").error && (
                  <Text>{form.getFieldState("location").error?.message}</Text>
                )}
              </HStack>
            </VStack>
            <FormInput
              control={form.control}
              name="title"
              formLabelProps={{
                text: "Tiêu đề",
              }}
            />
            <FormInput
              control={form.control}
              name="note"
              formLabelProps={{
                text: "Ghi chú",
              }}
            />
            <FormClockPicker
              control={form.control}
              name="fromHours"
              formLabelProps={{ text: "Giờ đến" }}
            />
            <FormClockPicker
              control={form.control}
              name="toHours"
              formLabelProps={{ text: "Giờ đi" }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onPress={() => {
                if (!typeActivity) return;
                form.setValue("type", typeActivity.key);
                form.handleSubmit(onSubmit)();
              }}
            >
              <ButtonText>Tạo</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack className="absolute bottom-0 left-0 right-0 w-full h-full bg-white p-4">
        {isShowTypeActivity ? (
          <HStack className="justify-between">
            {actions.map((action, index) => (
              <Button
                key={index + 1}
                className="rounded-full border border-gray-200 p-2"
                onPress={() => {
                  setTypeActivity({
                    key: action.key as any,
                    label: action.label,
                  });
                }}
              >
                <ButtonIcon as={action.icon} size="sm" />
              </Button>
            ))}
            <Button
              action="default"
              variant="default"
              className="rounded-full border border-gray-200 p-2"
              onPointerCancel={() => {
                setIsShowTypeActivity(false);
              }}
            >
              <ButtonIcon as={CloseIcon} size="sm" />
            </Button>
          </HStack>
        ) : (
          <Button
            onPress={() => {
              setIsShowTypeActivity(true);
            }}
          >
            <ButtonText>Thêm địa điểm mới</ButtonText>
          </Button>
        )}
      </VStack>
    </VStack>
  );
};



export default BeforeMapScreen