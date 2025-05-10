import React, { useEffect, useMemo } from "react";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { usePlanContext } from "@/contexts/PlanProvider";
import {
  addNotificationResponseReceivedListener,
  deleteNotificationCategoryAsync,
  dismissAllNotificationsAsync,
  removeNotificationSubscription,
  setNotificationCategoryAsync,
} from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NextIcon, StopIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { cn } from "@/lib/cn";
import { notificationService } from "@/services/notification-service";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/contexts/notification-context";
import { CHANNEL_IDS } from "@/utils/notification-helper";
import * as Notifications from "expo-notifications";

const CATEGORY_ID_BTN_NEXT = "CATEGORY_ID_BTN_NEXT";
const CATEGORY_ID_BTN_COMPLETE = "CATEGORY_ID_BTN_COMPLETE";
const CATEGORY_ID_BTN_EXIT = "CATEGORY_ID_BTN_EXIT";
const CATEGORY_ID_BTN_OPEN_APP = "CATEGORY_ID_BTN_OPEN_APP";
const ASYNC_STORAGE_KEY_TRIP_STATE = "tripState";

enum ETripStatus {
  OFF = "off",
  PREPARING = "preparing",
  RUNNING = "running",
}

const setNotificationCategory = async (
  CATEGORY_ID: string,
  type: "complete" | ETripStatus.RUNNING
) => {
  setNotificationCategoryAsync(CATEGORY_ID, [
    {
      identifier: CATEGORY_ID_BTN_EXIT,
      buttonTitle: "Thoát",
      options: {
        isDestructive: true,
      },
    },
    {
      identifier: CATEGORY_ID_BTN_OPEN_APP,
      buttonTitle: "Mở ứng dụng",
      options: {
        opensAppToForeground: true,
      },
    },
    {
      identifier:
        type === "complete" ? CATEGORY_ID_BTN_COMPLETE : CATEGORY_ID_BTN_NEXT,
      buttonTitle: type === "complete" ? "Hoàn thành" : "Tiếp theo",
    },
  ]);
};

const StartYourTrip = () => {
  const { expoPushToken } = useNotification();
  const { data: planData } = usePlanContext();
  const [isStartedTrip, setIsStartedTrip] = React.useState<ETripStatus>(
    ETripStatus.OFF
  );

  const CATEGORY_ID = useMemo(() => {
    //master category to check on server
    return `CATEGORY_ID_TRIP_${planData?.id}`;
  }, [planData?.id]);
  // const CHANNEL_ID_TRIP_STARTED = CHANNEL_IDS.CHANNEL_ID_TRIP_STARTED + `_${expoPushToken}_PlanID[${planData?.id}]`;
  const CHANNEL_ID_TRIP_STARTED = CHANNEL_IDS.CHANNEL_ID_TRIP_STARTED;

  const handleChangeTripStatus = (newStatus: ETripStatus) => {
    setIsStartedTrip(newStatus);
    AsyncStorage.setItem(ASYNC_STORAGE_KEY_TRIP_STATE, newStatus as string);
  };

  const sendNotification = async (nextActivityId: number) => {
    const activities = planData?.activities ?? [];

    const newNextActivityId =
      activities.length === 0 || nextActivityId >= activities.length
        ? -1
        : nextActivityId + 1;

    if (nextActivityId === activities.length - 1) {
      await setNotificationCategory(CATEGORY_ID, "complete");
    }

    // console.log("zzz,", newNextActivityId, nextActivityId, activities.length);

    const ac = activities[nextActivityId];

    return await Notifications.scheduleNotificationAsync({
      content: {
        title:
          `Điểm đến ${newNextActivityId === -1 ? "cuối" : ""} của bạn là: ` +
          activities[nextActivityId]?.title,
        body: `Thời lượng: ${Math.abs(ac.toHours - ac.fromHours)} giờ\n${
          ac.note ? "Ghi chú: " + ac.note : ""
        }`,
        subtitle:
          "Chúc bạn có một chuyến đi vui vẻ! Sử dụng các nút bên dưới để điều hướng",
        categoryIdentifier: CATEGORY_ID,
        data: {
          planId: planData?.id,
          categoryId: CATEGORY_ID,
          categoryIdentifier: CATEGORY_ID,
          channelId: "default",
          // activities: JSON.stringify(planData?.activities),
          nextActivityId: newNextActivityId,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        channelId: "default",
      },
    });

    return await notificationService.sendNotification({
      to: expoPushToken ?? "???expoPushToken",
      title:
        `Điểm đến ${newNextActivityId === -1 ? "cuối" : ""} của bạn là: ` +
        activities[nextActivityId]?.title,
      body: `Thời lượng: ${Math.abs(ac.toHours - ac.fromHours)} giờ\n${
        ac.note ? "Ghi chú: " + ac.note : ""
      }`,
      subtitle:
        "Chúc bạn có một chuyến đi vui vẻ! Sử dụng các nút bên dưới để điều hướng",
      categoryId: CATEGORY_ID,
      channelId: CHANNEL_ID_TRIP_STARTED,
      data: {
        planId: planData?.id,
        categoryId: CATEGORY_ID,
        categoryIdentifier: CATEGORY_ID,
        channelId: CHANNEL_ID_TRIP_STARTED,
        // activities: JSON.stringify(planData?.activities),
        nextActivityId: newNextActivityId,
      },
    });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return await sendNotification(0);
    },

    onSuccess: (data) => {
      console.log("Notification sent successfully", data);
      setIsStartedTrip(ETripStatus.RUNNING);
      AsyncStorage.setItem(
        ASYNC_STORAGE_KEY_TRIP_STATE,
        ETripStatus.RUNNING as string
      );
    },
  });

  useEffect(() => {
    const res_event_listener = addNotificationResponseReceivedListener(
      async (response) => {
        // Handle the notification response here
        // Example: handle user tap on the notification

        const actionIdentifier = response.actionIdentifier;
        const myData = response.notification.request.content.data;
        // const notificationCategoryIdentifier =
        //   response.notification.request.identifier;
        const categoryIdentifier =
          response.notification.request.content.data.categoryIdentifier;

        if (categoryIdentifier !== CATEGORY_ID) {
          throw new Error(
            `Invalid category identifier "${categoryIdentifier}" different from "${CATEGORY_ID}"`
          );
        }

        if (actionIdentifier === CATEGORY_ID_BTN_EXIT) {
          setIsStartedTrip(ETripStatus.OFF);
          AsyncStorage.setItem(
            ASYNC_STORAGE_KEY_TRIP_STATE,
            ETripStatus.OFF as string
          );
          await deleteNotificationCategoryAsync(CATEGORY_ID);
        }

        if (actionIdentifier === CATEGORY_ID_BTN_NEXT) {
          // deleteNotificationCategoryAsync(CATEGORY_ID);
          await sendNotification(myData.nextActivityId as any);
          await dismissAllNotificationsAsync();
        }

        if (actionIdentifier === CATEGORY_ID_BTN_COMPLETE) {
          await dismissAllNotificationsAsync();

          handleChangeTripStatus(ETripStatus.OFF);
        }

        // console.log(
        //   "🔔 Notification Response: ",
        //   JSON.stringify(response, null, 2),
        //   JSON.stringify(myData, null, 2)
        // );
      }
    );

    return () => {
      
    };
  }, []);

  useEffect(() => {
    const loadState = async () => {
      const savedState = (await AsyncStorage.getItem(
        ASYNC_STORAGE_KEY_TRIP_STATE
      )) as ETripStatus;


      handleChangeTripStatus(savedState)
    };
    loadState();
  }, []);

  useEffect(() => {
    if (
      isStartedTrip === ETripStatus.OFF ||
      isStartedTrip === ETripStatus.RUNNING
    )
      return;

    setNotificationCategory(CATEGORY_ID, ETripStatus.RUNNING);

    mutation.mutate();
  }, [isStartedTrip]);

  const handleNextActivity = async () => {};
  const handlePressStartTrip = () => {
    handleChangeTripStatus(ETripStatus.PREPARING);
  };

  console.log("StartYourTrip render", isStartedTrip);
  return (
    <VStack className="flex-1 items-center justify-center  bg-white">
      <HStack
        className={cn("mb-10 gap-5", {
          hidden:
            isStartedTrip === ETripStatus.OFF ||
            isStartedTrip === ETripStatus.PREPARING,
        })}
      >
        <VStack className="items-center">
          <Button
            className="flex-col rounded-full"
            size="xl"
            onPress={() => {
              handleChangeTripStatus(ETripStatus.OFF);
            }}
          >
            <ButtonIcon as={StopIcon} />
          </Button>
          <Heading size="xs">Hủy</Heading>
        </VStack>

        <VStack className="items-center">
          <Button
            className="flex-col rounded-full"
            size="xl"
            onPress={handleNextActivity}
          >
            <ButtonIcon as={NextIcon} />
          </Button>
          <Heading size="xs">Tiếp theo</Heading>
        </VStack>
      </HStack>

      <Button
        className={cn({
          hidden: isStartedTrip === ETripStatus.RUNNING,
        })}
        onPress={handlePressStartTrip}
        disabled={mutation.isPending || isStartedTrip === ETripStatus.PREPARING}
      >
        <ButtonText>Bắt đầu chuyến đi của tôi</ButtonText>
      </Button>
    </VStack>
  );
};

export default StartYourTrip;
