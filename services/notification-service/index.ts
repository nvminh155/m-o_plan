import { env } from "@/config/env";
import { http } from "@/lib/http";
import * as Notifications from "expo-notifications";

// export async function scheduleNotification(
//   title: string,
//   body: string,
//   date: Date
// ) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title,
//       body,
//       sound: true,
//       priority: Notifications.AndroidNotificationPriority.HIGH,
//     },
//     trigger: date,
//   });
// }

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export function setupNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

// type TPayloadSendNotification = {
//   token: string;
//   title: string;
//   body: string;
//   data: Object;
// };


type NotificationPriority = 'default' | 'normal' | 'high';
type InterruptionLevel = 'active' | 'critical' | 'passive' | 'time-sensitive';

interface TPayloadSendNotification {
  to: string | string[]; // Expo push token hoặc danh sách token
  contentAvailable?: boolean; // Chỉ iOS: Cho phép chạy tác vụ nền
  data?: Record<string, any>; // JSON object tối đa 4KB
  title?: string; // Tiêu đề thông báo
  body?: string; // Nội dung thông báo
  ttl?: number; // Thời gian tồn tại của thông báo (giây)
  expiration?: number; // Timestamp hết hạn
  priority?: NotificationPriority; // Mức độ ưu tiên
  subtitle?: string; // Chỉ iOS: Phụ đề
  sound?: string | null; // Chỉ iOS: Âm thanh (mặc định hoặc custom)
  badge?: number; // Chỉ iOS: Số hiển thị trên app icon
  interruptionLevel?: InterruptionLevel; // Chỉ iOS: Mức độ ưu tiên thông báo
  channelId?: string; // Chỉ Android: ID của Notification Channel
  icon?: string; // Chỉ Android: Tên resource icon
  richContent?: { image: string }; // Chỉ Android: Ảnh trong thông báo
  categoryId?: string; // ID của notification category
  mutableContent?: boolean; // Chỉ iOS: Có cho phép chỉnh sửa nội dung hay không
}


export const notificationService = {
  sendNotification: async (data: TPayloadSendNotification) => {
    return await http.post(
      "/expo/send-push-notification",
      { ...data },
      {
        baseUrl: env.BASE_URL_NODE_SERVER,
      }
    );
  },
};
