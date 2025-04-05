import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

export const addNotificationCategory = () => {
  return Notifications.setNotificationCategoryAsync("your_id_category", [
    {
      buttonTitle: "SKip",
      identifier: "identifier_btn_skip",
    },
  ]);
};

export const setupNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  setupRegisterJSTask();

  setupNotificationsChannel();
};

export const CHANNEL_IDS = {
  CHANNEL_ID_TRIP_STARTED: "CHANNEL_ID_TRIP_STARTED",
};

const setupNotificationsChannel = () => {
  Notifications.setNotificationChannelAsync(
    CHANNEL_IDS.CHANNEL_ID_TRIP_STARTED,
    {
      importance: Notifications.AndroidImportance.MAX,
      name: "Trip started",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    }
  );
};

const setupRegisterJSTask = () => {
  const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    ({ data, error, executionInfo }) => {
      console.log("✅ Received a notification in the background!", {
        data,
        error,
        executionInfo,
      });
      // Do something with the notification data
    }
  );
  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
};
