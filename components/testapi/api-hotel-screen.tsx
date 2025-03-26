import CardHotel from "@/components/card/card-hotel";
import HotelsScreen from "@/components/test/hotel-screen";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { tripadvisorService } from "@/services/tripadvisor";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

const TestApiHotel = () => {
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
    queryKey: ["hotelSearch"],
    queryFn: async () => {
      return await tripadvisorService.hotel.list({
        geoId: 303946,
        checkIn: "2025-03-20",
        checkOut: "2025-03-22",
      });
    },
  });
  // console.log("query", query.data);
  if (query.isLoading || !query.data) {
    return <Text>Loading hotel search...</Text>;
  }

  return (
    <VStack>
      <ScrollView>
        {query.isError && <Text>Error: {query.error.message}</Text>}
        {query.isSuccess && (
          <VStack>
            {query.data.data
              .filter((s) => s.__typename === "AppPresentation_SingleCard")
              .map((item, i: number) => {
                return (
                  <CardHotel
                    key={i + 1}
                    data={{
                      address: "123123",
                      description: "123123",
                      id: "123123",
                      imageUrl: item.listSingleCardContent.cardPhotos.length > 0
                        ? item.listSingleCardContent.cardPhotos[0].sizes.urlTemplate
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

        <HotelsScreen />
      </ScrollView>
    </VStack>
  );
};

export default TestApiHotel;
