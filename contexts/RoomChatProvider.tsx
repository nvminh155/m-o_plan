import { useLocalSearchParams } from "expo-router";
import React, { createContext } from "react";
import { TPlan } from "@/types/plan";
import { usePlanQuery } from "@/hooks/query/usePlanQuery";
import { TChat } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/services/chatService";
import Loading from "@/components/ui/loading";

type TRoomChatContext =
  | {
      data?: TChat;
    }
  | undefined;

const RoomChatContext = createContext<TRoomChatContext>({});

interface RoomChatProviderProps extends React.PropsWithChildren<{}> {}
const RoomChatProvider = ({ children }: RoomChatProviderProps) => {
  const {
    id,
  }: {
    id: string;
  } = useLocalSearchParams();

  const roomQuery = useQuery({
    queryKey: ["room", id],
    queryFn: () => chatService.get(id),
  });

  const value = React.useMemo(
    () => ({ data: roomQuery.data?.data }),
    [roomQuery.data]
  );

  return (
    <RoomChatContext.Provider value={value}>
      {roomQuery.isPending ? <Loading /> : children}
    </RoomChatContext.Provider>
  );
};

export const useRoomChatContext = () => {
  const context = React.useContext(RoomChatContext);
  if (context === undefined) {
    throw new Error(
      "useRoomChatContext must be used within a RoomChatProvider"
    );
  }
  return context;
};

export default RoomChatProvider;
