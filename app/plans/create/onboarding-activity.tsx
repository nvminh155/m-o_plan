import CardHotel from "@/components/card/card-hotel";
import { Heading } from "@/components/ui/heading";
import Loading from "@/components/ui/loading";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
} from "@/components/ui/modal";
import { VStack } from "@/components/ui/vstack";
import { tripadvisorService } from "@/services/tripadvisor";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView } from "react-native";

const OnboardingActivity = () => {
  return (
    <VStack className="flex-1">
      <Modal>
        <ModalBackdrop />
        <ModalContent>
          <ModalBody>
            <Loading text="Đang tải những địa điểm du lịch nên ghé thăm..." />
          </ModalBody>
        </ModalContent>
      </Modal>

      <SectionThingsToDo />
    </VStack>
  );
};

const SectionThingsToDo = () => {
  const query = useQuery({
    queryKey: ["attractionSe1arch"],
    queryFn: async () => {
      const curDate = new Date();
      return await tripadvisorService.attraction.list({
        geoId: 303946,
        startDate: `2025-03-${curDate.getDate()}`,
        endDate: `2025-03-${curDate.getDate() + 2}`,
      });
    },
  });

  return (
    <VStack className="gap-4 flex-1">
      <Heading size="xl">Địa điểm nên đến</Heading>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="h-auto bg-red-500 w-full"
        contentContainerClassName="gap-4"
      >
        {!query.isLoading &&
          query.data?.payload?.map((item: any, i: number) => {
            return (
              <CardHotel
                key={i + 1}
                data={{
                  address: "123123",
                  description: "123123",
                  id: "123123",
                  imageUrl: item.listSingleCardContent.cardPhoto
                    ? item.listSingleCardContent.cardPhoto.sizes.urlTemplate
                        .replace("{width}", "500")
                        .replace("{height}", "500")
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
      </ScrollView>
    </VStack>
  );
};
export default OnboardingActivity;
