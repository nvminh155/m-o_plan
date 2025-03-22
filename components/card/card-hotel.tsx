import React, { useState } from "react";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import AppImage from "../image/AppImage";
import { Pressable } from "../ui/pressable";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
  Icon,
  MapPinIcon,
  SearchIcon,
  SendIcon,
} from "../ui/icon";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import Avatar from "../ui/Avatar";
import { Input, InputField } from "../ui/input";
import { cn } from "@/lib/cn";
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
  };

  onFavoritePress?: (id: string) => void;
  onSeeRatesPress?: (id: string) => void;
}

const CardHotel: React.FC<HotelProps> = ({
  data,
  onFavoritePress,
  onSeeRatesPress,
}) => {
  const [favorite, setFavorite] = useState(data.isFavorite);
  const [expanded, setExpanded] = useState(false);

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
    <Box className="border-b border-gray-200 bg-white pb-4 mb-4 ">
      <VStack className="gap-4 items-start flex-1">
        {/* Hotel Image */}
        <Box className="relative w-full h-[200px] rounded-md">
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
              as={HeartIcon}
              size="md"
              className={cn("overflow-hidden", {
                "text-red-500 fill-red-500": favorite,
                "text-gray-400 fill-transparent": !favorite,
              })}
            />
          </Pressable>
        </Box>

        {/* Hotel Information */}
        <VStack className="flex-1 gap-1">
          <Text className="text-green-600 font-bold text-xs">
            {data.location}
          </Text>
          <Text className="font-bold text-xl line-clamp-2 text-wrap">
            {data.name}
          </Text>
          {/*   */}

          <HStack className="items-center gap-4 mb-2">
            <HStack className="items-center gap-1">
              <Text className="text-sm">Khách sạn {data.stars} sao</Text>
            </HStack>
            <HStack className="items-center gap-1">
              <Icon as={MapPinIcon} size="sm" className="text-gray-600" />
              <Text className="text-sm">{data.address}</Text>
            </HStack>
          </HStack>

          <Text
            className={cn(`text-sm text-gray-700 leading-loose`, {
              "line-clamp-3": !expanded,
            })}
          >
            {data.description}
          </Text>

          <Pressable onPress={toggleDescription} className="mt-1">
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
      </VStack>

      {/* Bottom Actions */}
      {/* <Box className="mt-4 border-t border-gray-200 pt-4">
        <Button
          className="border border-amber-500 w-[120px] self-start"
          onPress={handleSeeRatesPress}
        >
          <ButtonText className="text-amber-500">See rates</ButtonText>
        </Button>
      </Box> */}
    </Box>
  );
};

export default CardHotel;
