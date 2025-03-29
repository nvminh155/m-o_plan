import AppImage from "@/components/image/AppImage";
import TestApiAttraction from "@/components/testapi/api-attraction-screen";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Fab } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { usePlanContext } from "@/contexts/PlanProvider";
import { pythonService } from "@/services/pythonService";
import React from "react";

const ScheduleScreen = () => {
  const { data: planData } = usePlanContext();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleBuildTripWithAI = async () => {
    if (!planData) {
      console.log("no data found");
      return;
    }
    console.log("click");
    try {
      const res = await pythonService.buildTripWithAI(planData);
      const data = res.payload as string;
      console.log('==========', data);
      const data_json = data.split("<prev>")[1].split("</prev>")[0];
      const bot_response_activities = JSON.parse(data_json);

      const tmp_plan = planData;
      tmp_plan.activities = bot_response_activities
      // tmp_plan.activities = tmp_plan.activities
      //   .filter((activity) => {
      //     const updatedActivity = bot_response_activities.find(
      //       (botAct: any) =>
      //         botAct.location?.latitude === activity.location?.latitude &&
      //         botAct.location?.longitude === activity.location?.longitude
      //     );

      //     return updatedActivity ? false : true;
      //   })
      //   .map((activity) => {
      //     // Kiểm tra xem bot_response_activities có chứa key của activity không
      //     const updatedActivity = bot_response_activities.find(
      //       (botAct: any) =>
      //         botAct.location?.latitude === activity.location?.latitude &&
      //         botAct.location?.longitude === activity.location?.longitude
      //     );

      //     // Nếu có, cập nhật activity, nếu không, giữ nguyên
      //     return updatedActivity
      //       ? { ...activity, ...updatedActivity }
      //       : activity;
      //   });

      console.log(tmp_plan.activities);

      console.log("build activities with ai", bot_response_activities);
      setIsModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <VStack className="flex-1 px-4">
      <VStack className="mt-4"></VStack>
      <TestApiAttraction />
      <Fab
        className="bg-white"
        size="lg"
        onPress={() => setIsModalVisible(true)}
      >
        <AppImage
          source={require("@/assets/images/icons/ai-technology.png")}
          className="w-6 h-6"
        />
      </Fab>
      <Modal isOpen={isModalVisible} onClose={handleBuildTripWithAI}>
        <ModalContent>
          <ModalHeader>
            <Heading>Tạo chuyến đi với AI</Heading>
          </ModalHeader>

          <ModalBody>
            <Text>
              AI sẽ giúp bạn tạo chuyến đi dựa trên các hoạt động hiện có, ngày
              và giờ đi, sô lượng người, ngân sách, ... để giúp bạn lên một lịch
              trình cụ thể cho chuyến đi của mình như thời lượng của mỗi hoạt
              động, ngày bắt đầu, ghi chú
            </Text>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button onPress={() => handleBuildTripWithAI()}>
                <ButtonText>Tạo</ButtonText>
              </Button>
              <Button
                action="secondary"
                onPress={() => setIsModalVisible(false)}
              >
                <ButtonText>Hủy</ButtonText>
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ScheduleScreen;
