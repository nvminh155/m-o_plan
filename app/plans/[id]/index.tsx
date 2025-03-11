import MoneyView from "@/components/plans/money-view";

import React from "react";
import { ScrollView } from "react-native";
import { usePlanContext } from "@/contexts/PlanProvider";
import Loading from "@/components/ui/loading";
import { VStack } from "@/components/ui/vstack";

import PlanDetailHeader from "@/components/plans/id/home/header";
import PlanDetailHomeBanner from "@/components/plans/id/home/banner";
import PlanDetailRecentlyActivity from "@/components/plans/id/home/recently-activity";
import PlanDetailMoreAction from "@/components/plans/id/home/more-action";

const DetailPlans = () => {
  const { data } = usePlanContext();

  if (!data) return <Loading />;

  return (
    <VStack className="flex-1 relative">
      <PlanDetailHeader />

      <ScrollView className="flex-1">
        <PlanDetailHomeBanner />

        <MoneyView piggyBank={data.piggyBank} />

        <PlanDetailMoreAction />

        <PlanDetailRecentlyActivity />

        {/* <TabsNavigation /> */}
      </ScrollView>
    </VStack>
  );
};

export default DetailPlans;
