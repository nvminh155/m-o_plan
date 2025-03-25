import Activity from "@/components/activity/next-activity";
import FastSchedule from "@/components/home/fast-schedule";
import Header from "@/components/home/header";
import AppText from "@/components/ui/AppText";
import Wrapper from "@/components/ui/Wrapper";
import { ScrollView, View } from "react-native";

export default function Index() {
  return (
    <Wrapper className="min-h-full !p-0">
      <ScrollView contentContainerClassName="flex-1 min-h-screen pb-5 mb-10">
        <Header />

        <View className="mt-10">
          <View className="gap-3">
            <AppText text="Have a 1Good Day," className="!text-5xl" />
            <AppText text="Username" className="!text-5xl" />
          </View>
        </View>

        <FastSchedule />

        <Activity
          data={{
            title: "Traveling to Switzerland",
            note: "Traveling to Switzerland",
            fromHours: new Date().getTime(),
            toHours: new Date().getTime(),
            id: "1",
            location: {
              id: '1',
              name: "Switzerland",
              address: "Switzerland",
              latitude: 10.9996864,
              longitude: 106.678229,
            },
            startDate: new Date().getTime(),
            endDate: new Date().getTime(),
            onDate: new Date().getTime(),
            type: "food",
            priority: 1,
          }}
        />
      </ScrollView>
      {/* <MapScreen /> */}
    </Wrapper>
  );
}
