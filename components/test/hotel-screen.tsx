import { ScrollView } from "react-native"

import CardHotel from "../card/card-hotel"
import { Box } from "../ui/box"
import { VStack } from "../ui/vstack"
import { Heading } from "../ui/heading"
import { Text } from "../ui/text"


export default function HotelsScreen() {
  const hotelData = {
    id: "1",
    name: "Nguyen Ha Hotel",
    location: "VUNG TAU",
    address: "81/16 Thuy Van, Ward 2",
    rating: 4,
    totalReviews: 10,
    stars: 3,
    description:
      "Welcome to Nguyen Ha Hotel, your Vung Tau \"home away from home.\" Nguyen Ha Hotel aims to make your visit as relaxing and enjoyable as possible, which is why so many guests continue to come back year after year. Close to some of Vung Tau's most popular landmarks, such as The Whale Temple (0.3 mi) and Mui Nghinh Phong (0.8 mi), Nguyen Ha Hotel is a great destination for tourists. The rooms offer air conditioning and a refrigerator, and getting online is possible, as free wifi is available, allowing you to rest and refresh with ease. Nguyen Ha Hotel features a 24 hour front desk. While you're here, be sure to check out some of the Italian restaurants, including David Pizzeria, Ly's Coffee & Cakes, and Prego Yogurt, all of which are a short distance from Nguyen Ha Hotel. If you're looking for things to do, you can check out Christ the King (0.4 mi), Vung Tau Lighthouse (0.8 mi), or Vung Tau Ferry Terminal (1.2 mi), which are popular attractions amongst tourists, and they are all within walking distance. Nguyen Ha Hotel puts the best of Vung Tau at your fingertips, making your stay both relaxing and enjoyable.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qgyAp0Wp95tUA0UHLuwIm2oIgVaG4k.png",
    isFavorite: true,
  }

  const handleFavoritePress = (id: string) => {
    console.log("Favorite pressed for hotel:", id)
  }

  const handleSeeRatesPress = (id: string) => {
    console.log("See rates pressed for hotel:", id)
  }

  return (
    <Box className="p-4 flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <Heading size="lg">Khách sạn tại Vũng Tàu</Heading>
          <Text className="text-gray-400 font-medium" size="sm">Chọn nơi bạn sẽ ở lại</Text>
          <CardHotel data={hotelData} onFavoritePress={handleFavoritePress} onSeeRatesPress={handleSeeRatesPress} />

          {/* You can add more hotel cards here */}
        </VStack>
      </ScrollView>
    </Box>
  )
}

