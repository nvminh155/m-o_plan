import AppImage from "@/components/image/AppImage";
import AppButton from "@/components/ui/AppButton";
import Wrapper from "@/components/ui/Wrapper";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

// Sample Plans Data
const plans = [
  {
    id: "1",
    title: "We plan to go to the moon",
    description: "Go with the flow and see where it takes you.",
    price: "$5/month",
    image: "https://via.placeholder.com/800x450", // Placeholder image
  },
  {
    id: "2",
    title: "Pro Plan",
    description: "Best for professionals needing more features.",
    price: "$15/month",
    image: "https://via.placeholder.com/800x450",
  },
  {
    id: "3",
    title: "Enterprise Plan",
    description: "Tailored solutions for your team.",
    price: "$30/month",
    image: "https://via.placeholder.com/800x450",
  },
];

export default function App() {
  const renderPlan = ({ item }) => (
    <View className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg">
      <AppImage
        source={require("@/assets/images/test/16x9anime.png")}
        className="w-full aspect-video object-cover"
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600 mb-2">{item.description}</Text>
        <AppButton
          className="bg-green-600 py-2 rounded-lg items-center"
          onPress={() => {
            router.push({
              pathname: "/plans/[id]",
              params: { id: item.id },
            });
          }}
        >
          <Text className="text-white text-base font-bold">Xem</Text>
        </AppButton>
      </View>
    </View>
  );

  return (
    <Wrapper>
      <FlatList
        data={plans}
        renderItem={renderPlan}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Wrapper>
  );
}
