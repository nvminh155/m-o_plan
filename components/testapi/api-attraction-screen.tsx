import CardHotel from "@/components/card/card-hotel";
import HotelsScreen from "@/components/test/hotel-screen";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { tripadvisorService } from "@/services/tripadvisor";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

const TestApiAttraction = () => {
  const [data, setData] = React.useState<any[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await tripadvisorService.hotel.list({
  //       location_id: 303946,
  //       adults: 1,
  //       nights: 2,
  //       rooms: 1,
  //     });
  //     setData(res.data);
  //   };
  //   fetchData();
  // }, []);



  const query = useQuery({
    queryKey: ["attractionSe1arch"],
    queryFn: async () => {
      return await tripadvisorService.attraction.list({
        geoId: 303946,
        startDate: "2025-03-22",
        endDate: "2025-03-24",
      });
    },
  });
  console.log("query", query.data);
  if (query.isLoading || !query.data) {
    return <Text>Loading attraction 1search...</Text>;
  }

  return (
    <VStack>
      <ScrollView>
        {query.isError && <Text>Error: {query.error.message}</Text>}
        {query.isSuccess && (
          <VStack>
            {query.data.payload
              .map((item, i: number) => {
                return (
                  <CardHotel
                    key={i + 1}
                    data={{
                      address: "123123",
                      description: "123123",
                      id: "123123",
                      imageUrl: item.listSingleCardContent.cardPhoto
                        ? item.listSingleCardContent.cardPhoto.sizes.urlTemplate
                            .replace("{width}", "300")
                            .replace("{height}", "300")
                        : "",
                      location: "123123",
                      name: item.listSingleCardContent.cardTitle.string,
                      rating: 4,
                      stars: 4,
                      totalReviews: 4,
                      isFavorite: false,
                      
                    }}
                  />
                );
              })}
          </VStack>
        )}

        {/* <HotelsScreen /> */}
      </ScrollView>
    </VStack>
  );
};

export default TestApiAttraction;
