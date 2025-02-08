import { db } from "@/firebaseConfig";
import { PlanSchema, TPlan } from "@/types/plan";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { chatService } from "./chatService";
import { botService } from "./userService";

import uuid from "react-native-uuid";

export const PLAN_PATH = "plans";

export const planService = {
  createPlan: async (plan: PlanSchema, createByUserId: string) => {
    const idDoc = uuid.v4();
    const ref = doc(db, PLAN_PATH, idDoc);
    const docData: TPlan = {
      ...plan,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      inviteCode: idDoc,
      id: idDoc,
      groupChatId: "",
      createByUserId,
      logs: [],
      settingId: [],
    };
    console.log("docData", docData);
    await setDoc(ref, docData);

    const groupChat = await chatService.createGroupChat(
      plan.title,
      createByUserId
    );
    const bot = await botService.createBot("Bot - Plan - " + ref.id);

    await updateDoc(groupChat.ref, {
      ...groupChat.data,
      members: arrayUnion(bot.ref.id),
    });

    return {
      ref: ref,
      data: {
        ...docData,
        groupChatId: groupChat.ref.id,
      },
    };
  },

  getPlan: async (id: string) => {
    const ref = doc(db, PLAN_PATH, id);
    const res = await getDoc(ref);

    return {
      ref: res.ref,
      data: res.data() as TPlan,
    };
  },

  getList: async () => {
    const ref = collection(db, PLAN_PATH);
    const res = await getDocs(ref);

    return {
      ref: ref,
      data: res.docs.map((item) => item.data()) as TPlan[],
    };
  },
};
