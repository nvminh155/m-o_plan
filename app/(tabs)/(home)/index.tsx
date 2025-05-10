import AppImage from "@/components/image/AppImage";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import {
  BusIcon,
  FlightIcon,
  HotairBalloonIcon,
  HotelIcon,
  Icon,
  SearchIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Wrapper from "@/components/ui/Wrapper";
import { Image } from "expo-image";

export default function Index() {
  return (
    <Wrapper className="!p-0 bg-[#f5f5f5]/10 flex-1">
      <Image
        source={require("@/assets/images/test_img.jpg")}
        className="w-full h-1/2 max-h-[300px]"
      />

      <HStack
        className="gap-4 bg-white rounded-full px-5 mx-6 -mt-10 py-4 mb-4"
        style={{
          shadowColor: "#888",
          shadowOffset: { width: -2, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <Icon as={SearchIcon} size="lg" className="text-primary-500" />

        <VStack>
          <Text className="font-medium">Bạn muốn đi đâu?</Text>
          <HStack className="gap-4">
            <Text className="text-[#333]/30" size="xs">
              Bất cứ đâu
            </Text>
            <Text className="text-[#333]/30" size="xs">
              Bất kỳ tuần nào
            </Text>
            <Text className="text-[#333]/30" size="xs">
              Thêm mọi người
            </Text>
          </HStack>
        </VStack>
      </HStack>

      <HStack className="gap-4  mx-10 justify-between my-7">
        <VStack className="items-center">
          <Button className="bg-white rounded-full w-20 h-20">
            <ButtonIcon as={HotelIcon} className="text-black" />
          </Button>
          <Text size="xs" className="text-gray-600">
            Khách sạn
          </Text>
        </VStack>
        <VStack className="items-center">
          <Button className="bg-white rounded-full w-20 h-20">
            <ButtonIcon as={FlightIcon} className="text-black" color={"#333"} />
          </Button>
          <Text size="xs" className="text-gray-600">
            Chuyến bay
          </Text>
        </VStack>
        <VStack className="items-center">
          <Button className="bg-white rounded-full w-20 h-20">
            <ButtonIcon as={BusIcon} className="text-black" color="#000" />
          </Button>
          <Text size="xs" className="text-gray-600">
            Tham quan
          </Text>
        </VStack>
        <VStack className="items-center">
          <Button className="bg-white rounded-full w-20 h-20">
            <ButtonIcon
              as={HotairBalloonIcon}
              className="text-black"
              color="#999"
            />
          </Button>
          <Text size="xs" className="text-gray-600">
            Trải nghiệm
          </Text>
        </VStack>
      </HStack>
    </Wrapper>
  );
}
