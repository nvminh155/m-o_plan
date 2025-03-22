import CardHotel from "@/components/card/card-hotel";
import HotelsScreen from "@/components/test/hotel-screen";
import TestApiAttraction from "@/components/testapi/api-attraction-screen";
import TestApiHotel from "@/components/testapi/api-hotel-screen";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { tripadvisorService } from "@/services/tripadvisor";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

const TestApi = () => {
  const [data, setData] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await tripadvisorService.locationSearch({
        query: "Vũng tàu",
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  const query = useQuery({
    queryKey: ["locationSearch"],
    queryFn: async () => {
      return await tripadvisorService.locationSearch({ query: "Vũng tàu" });
    },
  });

  return (
    <VStack>
      <ScrollView>
        {query.isLoading && <Text>Loading search location...</Text>}
        {query.isError && <Text>Error: {query.error.message}</Text>}
        {query.isSuccess && (
          <VStack>
            {/* {query.data.data.map((item: any, i: number) => {
              if (i === 0)
                console.log(
                  Object.entries(query.data.data.filter((r : any) => r.result_type === "restaurants")[0].result_object)
                    .map(([key, value], i) => `${key}: ${typeof value}`)
                    .join("\n")
                );
              return <Text key={i + 1}>{item.scope}</Text>;
            })} */}

            {/* {Object.entries(query.data.data[0].result_object)
              .map(([key, value], i) => `${key}: ${typeof value}`)
              .join("\n")} */}
          </VStack>
        )}
        {/* <TestApiHotel /> */}
        <TestApiAttraction />
      </ScrollView>
    </VStack>
  );
};

export default TestApi;
