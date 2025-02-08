import { db } from "@/firebaseConfig";
import { TChat, TChatGroup } from "@/types/chat";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import uuid from "react-native-uuid";

const CHAT_PATH = "chats";

export const chatService = {
  createGroupChat: async (groupName: string, createByUserId: string) => {
    const idDoc = uuid.v4();
    const ref = doc(db, CHAT_PATH, idDoc);

    const docData: TChatGroup = {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      groupName,
      messages: [],
      settingId: [],
      type: "group",
      inviteCode: idDoc,
      id: idDoc,
      members: [createByUserId],
    };
    await setDoc(ref, docData);

    return {
      ref: ref,
      data: {
        ...docData,
      },
    };
  },
  get: async (roomId: string) => {
    const ref = doc(db, CHAT_PATH, roomId);
    const room = await getDoc(ref);

    return {
      ref: room.ref,
      data: room.data() as TChat,
    };
  },
  getListRoom: async (userId: string) => {
    const roomQuery = query(
      collection(db, CHAT_PATH),
      where("members", "array-contains-any", [userId])
    );
    const rooms = await getDocs(roomQuery);

    return {
      data: rooms.docs.map((r) => r.data() as TChat),
    };
  },
};
