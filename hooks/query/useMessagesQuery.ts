import { db } from "@/firebaseConfig";
import { TMessage } from "@/types/chat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";

export const useMessagesQuery = (roomId: string) => {
  const ref = collection(db, `chats/${roomId}/messages`);
  const firebaseQuery = query(ref, orderBy("createdAt", "asc"));

  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ["chats", roomId, "messages"],
    queryFn: async () => {
      const messages = await getDocs(firebaseQuery);

      return {
        data: messages.docs.map((doc) => doc.data() as TMessage),
      };
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (snap) => {
      // console.log(snap.docChanges().map((d) => d.type));
      queryClient.invalidateQueries({
        queryKey: ["chats", roomId, "messages"],
      });
    });

    return () => unsubscribe();
  }, []);

  console.log("re-render messquery");
  return messagesQuery;
};
