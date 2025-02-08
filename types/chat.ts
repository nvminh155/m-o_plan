type TMessageBase = {
  id: string;
  sender: {
    id: string;
    fullName: string;
    avatar: string | null;
  };
  createdAt: number;
  updatedAt: number;
  typeUser: "bot" | "user";
};

type TFile = {
  id?: string;
  name: string;
  url: string;
  type: "image" | "video" | "audio" | "file";
  size: number;
  createdAt: number;
  updatedAt: number;
};

export type TMessageUser = TMessageBase & {
  content: string; // emoji, text,
  files: TFile[];
  reactions: string[];
};

type TMessageBotBase = TMessageBase & {
  typeMessage: "welcome" | "remind-activity" | "remind-piggy-bank";
};
type TMessageBotWelcome = TMessageBotBase & {
  content: string;
};
type TMessageBotRemindActivity = TMessageBotBase & {
  thumbnail: string;
  title: string;
  datetime: number;
};

type TMessageBotRemindPiggyBank = TMessageBotBase & {
  content: string;
};

export type TMessageBot =
  | TMessageBotRemindActivity
  | TMessageBotRemindPiggyBank
  | TMessageBotWelcome;

export type TMessage = TMessageUser | TMessageBot;

type TChatBase = {
  id: string;
  messages: TMessage[];
  settingId: string[];
  type: "group" | "private";
  inviteCode: string;
  createdAt: number;
  updatedAt: number;
};

export type TChatGroup = TChatBase & {
  groupName: string; // maybe name of plan
  members: string[]; // array userid
};

export type TChatPrivate = TChatBase & {
  receiver: {
    id: string;
    fullName: string;
    avatar: string;
  };
};

export type TChat = TChatGroup | TChatPrivate;
