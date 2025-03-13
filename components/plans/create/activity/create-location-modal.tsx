import { Modal, ScrollView, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

import { HStack } from "@/components/ui/hstack";

import { Text } from "@/components/ui/text";
import {
  BedIcon,
  CameraIcon,
  CloseIcon,
  MapPinIcon,
  PlaneIcon,
  UtensilsIcon,
} from "@/components/ui/icon";
import FormInput from "@/components/ui/form-control/form-input";

const locationSchema = z.object({
  title: z.string().min(1),
  note: z.string().optional(),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface CreateLocationModalProps {
  isVisible: boolean;
  onClose: () => void;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
}

export const CreateLocationModal = ({
  isVisible,
  onClose,
  location,
}: CreateLocationModalProps) => {
  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = (data: LocationFormData) => {
    // Handle form submission
    console.log("Form data:", {
      ...data,
      location,
      region: "Vũng Tàu, Việt Nam",
    });
    onClose();
  };

  const actions = [
    { icon: CameraIcon, label: "Ảnh" },
    { icon: BedIcon, label: "Lưu trú" },
    { icon: UtensilsIcon, label: "Ẩm thực" },
    { icon: MapPinIcon, label: "Địa điểm" },
    { icon: PlaneIcon, label: "Du lịch" },
  ];

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        <View className="p-4 border-b border-gray-200">
          <HStack className="justify-between items-center">
            <Text className="text-lg font-semibold">Thông tin hoạt động</Text>
            <Button onPress={onClose}>
              <ButtonIcon as={CloseIcon} />
            </Button>
          </HStack>
        </View>

        <ScrollView className="flex-1 p-4">
          <HStack className="justify-between mb-6">
            {actions.map((action, index) => (
              <Button
                key={index + 1}
                className="rounded-full border border-gray-200 p-2"
              >
                <ButtonIcon as={action.icon} size="sm" />
              </Button>
            ))}
          </HStack>

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

        
        </ScrollView>

        <View className="p-4 border-t border-gray-200">
          <Button
            onPress={form.handleSubmit(onSubmit)}
            className="bg-orange-100"
          >
            <ButtonText className="text-orange-500">Tạo điểm đến</ButtonText>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
