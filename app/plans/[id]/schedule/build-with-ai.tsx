import PushNotification from "@/components/plans/id/schedule/push-notification";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const StartYourTrip = () => {
  const curDate = new Date();

  return (
    <VStack className="flex-1 items-center justify-center mt-10">
      <Button className="">
        <ButtonText>Bắt đầu lịch trình của tôi</ButtonText>
      </Button>
      <PushNotification />
    </VStack>
  );
};

export default StartYourTrip;
