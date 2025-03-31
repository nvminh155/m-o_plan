import CardHotel from "@/components/card/card-hotel";
import { VStack } from "@/components/ui/vstack";
import { usePlanContext } from "@/contexts/PlanProvider";
import { activities } from "@/data/activities";
import { db } from "@/firebaseConfig";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { ScrollView } from "react-native";

const TestApiAttraction = () => {
  const { data: planData } = usePlanContext();

  return (
    <VStack className="pb-4">
      <ScrollView>
        {planData?.activities
          .sort((a, b) => a.priority - b.priority)
          .map((item, i: number) => {
            return (
              <CardHotel
                key={i + 1}
                data={{
                  address: planData?.destination.address ?? "",
                  description: "",
                  id: "123123",
                  imageUrl: item.thumbnail
                    ? item.thumbnail
                        .replace("{width}", "300")
                        .replace("{height}", "300")
                    : "",
                  location: planData?.destination.address ?? "",
                  name: `${i + 1}.` + item.title.split(".")[1],
                  rating: 4,
                  stars: 4,
                  totalReviews: 4,
                  isFavorite: true,
                }}
                activity={{ ...item, isFavorite: true, id: i.toString() }}
                onFavoritePress={async () => {
                  await updateDoc(doc(db, `plans/${planData.id}`), {
                    activities: arrayRemove({ ...item }),
                  });
                }}
              />
            );
          })}
      </ScrollView>
    </VStack>
  );
};

export default TestApiAttraction;
