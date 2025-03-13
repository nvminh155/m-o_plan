"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import FormInput from "@/components/ui/form-control/form-input";
// import FormSelect from "@/components/ui/form-control/form-select";
import { CameraIcon, Icon, MapPinIcon, CloseIcon } from "@/components/ui/icon";
// import * as ImagePicker from "expo-image-picker";
import { Pressable, ScrollView, View } from "react-native";
import FormInput from "@/components/ui/form-control/form-input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const formSchema = z.object({
  name: z.string().min(1, "Tên địa điểm không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});

type FormData = z.infer<typeof formSchema>;

interface DestinationFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData & { images: string[] }) => void;
  initialData?: {
    name?: string;
    address?: string;
  };
}

export const DestinationFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData = {},
}: DestinationFormModalProps) => {
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      description: "",
      category: "",
      address: initialData.address || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      images,
    });
    form.reset();
    setImages([]);
  };

  const pickImage = async () => {
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.canceled && result.assets && result.assets.length > 0) {
    //   setImages([...images, result.assets[0].uri]);
    // }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const categories = [
    { label: "Nhà hàng", value: "restaurant" },
    { label: "Khách sạn", value: "hotel" },
    { label: "Điểm tham quan", value: "attraction" },
    { label: "Cửa hàng", value: "shop" },
    { label: "Khác", value: "other" },
  ];

  return (
    <Modal isOpen={visible} onClose={onClose} size="full">
      <ModalContent>
        <ModalHeader>
          <HStack space="sm">
            {/* <MapPinIcon size="md" color="$primary500" /> */}
            <Heading size="lg">Thông tin điểm đến</Heading>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <ScrollView>
            <VStack space="md" className="p-2">
              <FormInput
                control={form.control}
                name="name"
                formLabelProps={{
                  text: "Tên địa điểm",
                }}
                placeholder="Nhập tên địa điểm"
                required
              />

              <FormInput
                control={form.control}
                name="description"
                formLabelProps={{
                  text: "Mô tả",
                }}
                placeholder="Mô tả về địa điểm này"
                multiline
                numberOfLines={4}
                required
              />
{/* 
              <FormSelect
                control={form.control}
                name="category"
                formLabelProps={{
                  text: "Danh mục",
                }}
                placeholder="Chọn danh mục"
                options={categories}
                required
              /> */}

              <FormInput
                control={form.control}
                name="address"
                formLabelProps={{
                  text: "Địa chỉ",
                }}
                placeholder="Địa chỉ chi tiết"
                required
              />

              <VStack space="sm">
                <Text className="text-gray-700 font-medium mb-1">Hình ảnh</Text>
                <HStack className="flex-wrap">  
                  {images.map((uri, index) => (
                    <View key={index} className="relative m-1">
                      <Image
                        source={{ uri }}
                        alt={`Image ${index}`}
                        className="w-24 h-24 rounded-md"
                      />
                      <Pressable
                        onPress={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-gray-800 rounded-full p-1 opacity-70"
                      >
                        <Icon as={CloseIcon} size="xs" color="white" />
                      </Pressable>
                    </View>
                  ))}
                  <Pressable
                    onPress={pickImage}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md justify-center items-center m-1"
                  >
                    {/* <CameraIcon size="md" color="$gray400" /> */}
                    <Icon as={CameraIcon} size="md" className="text-gray-400" />
                    <Text className="text-gray-400 text-xs mt-1">Thêm ảnh</Text>
                  </Pressable>
                </HStack>
              </VStack>
            </VStack>
          </ScrollView>
        </ModalBody>
        <ModalFooter>
          <HStack space="md" className="justify-end">
            <Button variant="outline" onPress={onClose}>
              <ButtonText>Hủy</ButtonText>
            </Button>
            <Button onPress={form.handleSubmit(handleSubmit)}>
              <ButtonText>Lưu</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
