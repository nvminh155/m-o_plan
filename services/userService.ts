import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { TBot } from "@/types/user";
import uuid from "react-native-uuid";

const USER_PATH = "users";
const BOT_PATH = "bots";

export const userService = {};

export const botService = {
  createBot: async (botName: string) => {
    const idDoc = uuid.v4();
    const ref = doc(db, BOT_PATH, idDoc);

    const docData: TBot = {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      fullName: botName,
      avatar: "https://i.pravatar.cc/300",
      chats: [],
      type: "bot",
      id: idDoc,
    };

    await setDoc(ref, docData);

    return {
      ref: ref,
      data: {
        ...docData,
      },
    };
  },
};
