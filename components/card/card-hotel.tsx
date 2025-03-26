import React, { useState } from "react";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import AppImage from "../image/AppImage";
import { Pressable } from "../ui/pressable";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  EditIconfyIcon,
  HeartFillIcon,
  HeartIcon,
  Icon,
  MapPinIcon,
  SearchIcon,
  SendIcon,
} from "../ui/icon";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Button, ButtonGroup, ButtonText } from "../ui/button";
import Avatar from "../ui/Avatar";
import { Input, InputField } from "../ui/input";
import { cn } from "@/lib/cn";
import { usePlanContext } from "@/contexts/PlanProvider";
import { z } from "zod";
import { activitySchema } from "@/schemas/planSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TActivity } from "@/types/plan";
import FormInput from "../ui/form-control/form-input";
import FormDateTimePicker from "../ui/form-control/form-datetime-picker";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/modal";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { I } from "@expo/html-elements";
import { toDate } from "@/utils/convertTimestamp";
// import { Avatar, Input, InputField } from "@gluestack-ui/react"
// import { Heart, MapPin, ChevronUp, ChevronDown, Send } from "lucide-react-native"
// import { Box, HStack, VStack, Image, Text, Pressable, Icon, Button, ButtonText } from "../ui"

interface HotelProps {
  data: {
    id: string;
    name: string;
    location: string;
    address: string;
    rating: number;
    totalReviews: number;
    stars: number;
    description: string;
    imageUrl: string;
    isFavorite?: boolean;
    onDate?: number;
    duration?: number; // hour
  };
  activity: TActivity & {
    isFavorite?: boolean;
    duration?: number;
  };
  onFavoritePress?: (id: string) => void;
  onSeeRatesPress?: (id: string) => void;
}

const CardHotel: React.FC<HotelProps> = ({
  data,
  activity,
  onFavoritePress,
  onSeeRatesPress,
}) => {
  const { data: planData } = usePlanContext();

  const [favorite, setFavorite] = useState(data.isFavorite);
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleFavoritePress = () => {
    setFavorite(!favorite);
    if (onFavoritePress) {
      onFavoritePress(data.id);
    }
  };

  const handleSeeRatesPress = () => {
    if (onSeeRatesPress) {
      onSeeRatesPress(data.id);
    }
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  // Render rating dots
  const renderRatingDots = () => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <Box
          key={i}
          className={`w-4 h-4 rounded-full ${
            i <= data.rating ? "bg-green-500" : "bg-gray-200"
          } mr-1`}
        />
      );
    }
    return dots;
  };

  return (
    <Box className="border-b border-gray-200 bg-white pb-4 mb-4 rounded-xl">
      <VStack className="gap-4 items-start flex-1">
        {/* Hotel Image */}
        <Box className="relative w-full h-[200px] rounded-tl-xl rounded-tr-xl overflow-hidden">
          {/* image gluestack */}
          <AppImage
            source={{
              uri: data.imageUrl,
            }}
            alt={data.name}
            className="w-full h-full"
          />
          <Pressable
            className="absolute top-2 left-2 bg-white rounded-full p-2"
            onPress={handleFavoritePress}
          >
            <Icon
              // heart icon gluestack
              as={!favorite ? HeartIcon : HeartFillIcon}
              size="md"
              className={cn("overflow-hidden", {
                "text-red-500 fill-red-500": favorite,
                "text-gray-400 fill-transparent": !favorite,
              })}
            />
          </Pressable>

          <Pressable
            className="absolute top-24 left-2 bg-white rounded-full p-2"
            onPress={() => setEditMode(true)}
          >
            <Icon
              // heart icon gluestack
              as={EditIconfyIcon}
              size="md"
              className={cn("overflow-hidden", {
                "text-red-500 fill-red-500": favorite,
                "text-gray-400 fill-transparent": !favorite,
              })}
            />
          </Pressable>
        </Box>

        {/* Hotel Information */}
        <VStack className="flex-1 gap-1 px-4">
          <Text className="text-green-600 font-bold text-xs">
            {data.location}
          </Text>
          <Text className="font-bold text-xl line-clamp-2 text-wrap">
            {data.name}
          </Text>

          <VStack className="gap-4 mb-2">
            <HStack className="items-center gap-1">
              <Text className="text-sm">Thời lượng: </Text>
              <Text className="text-sm">
                {activity.fromHours ? activity.fromHours : "Chưa có"}
              </Text>
            </HStack>

            <HStack className="items-center gap-1">
              <Text className="text-sm">Ngày bắt đầu: </Text>
              <Text className="text-sm">
                {activity.onDate > 0 ? toDate(activity.onDate) : "Chưa có"}
              </Text>
            </HStack>
          </VStack>

          <VStack>
            <Text
              className={cn(`text-sm text-gray-700 leading-loose`, {
                "line-clamp-3": !expanded,
              })}
            >
              Ghi chú: {activity.note ? activity.note : "Chưa có"}
            </Text>
          </VStack>

          <Pressable
            onPress={toggleDescription}
            className={cn("mt-1", {
              hidden: !activity.note,
            })}
          >
            <HStack className="items-center gap-1">
              <Text className="text-gray-700 font-semibold text-sm">
                {expanded ? "Thu gọn" : "Đọc thêm"}
              </Text>
              <Icon
                as={expanded ? ChevronUpIcon : ChevronDownIcon}
                size="sm"
                className="text-gray-700"
              />
            </HStack>
          </Pressable>
        </VStack>

        <FormEditHotel
          editMode={editMode}
          activity={activity}
          onClose={() => setEditMode(false)}
          onEdit={async (data) => {
            console.log("Edit data", data);
            const activities = planData?.activities.map((item, i) => {
              if (i.toString() === activity.id) {
                return {
                  ...item,
                  ...data,
                };
              }

              return item;
            });

            await updateDoc(doc(db, `plans/${planData?.id}`), {
              activities: activities,
            }).then(async (r) => {
              setEditMode(false);
            });
          }}
        />
      </VStack>
    </Box>
  );
};

const formSchema = activitySchema;
type TForm = z.infer<typeof formSchema>;

interface FormEditHotelProps {
  activity: TActivity;
  editMode: boolean;
  onEdit: (data: TForm) => void;
  onClose?: () => void;
}

const FormEditHotel = ({
  activity,
  editMode,
  onClose,
  onEdit,
}: FormEditHotelProps) => {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...activity,
      onDate: new Date().getTime(),
    },
  });

  return (
    <Modal onClose={onClose} isOpen={editMode}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>
          <FormInput
            control={form.control}
            name="fromHours"
            formLabelProps={{
              text: "Thời lượng",
            }}
            keyboardType="number-pad"
            placeholder="Nhập thời lượng"
          />
          <FormDateTimePicker
            control={form.control}
            name="onDate"
            formLabelProps={{
              text: "Ngày bắt đầu",
            }}
            onChangeCB={(date) => {
              form.setValue("endDate", date);
              form.setValue("startDate", date);
            }}
          />
          <FormInput
            control={form.control}
            name="note"
            formLabelProps={{
              text: "Ghi chú",
            }}
            placeholder=""
          />
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button onPress={form.handleSubmit(onEdit)}>
              <ButtonText>Cập nhật</ButtonText>
            </Button>
            <Button onPress={() => {}} action="secondary">
              <ButtonText>Hủy</ButtonText>
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CardHotel;
