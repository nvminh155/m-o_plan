type TUser = {
  id?: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  settingId: string[];
  chats: string[]; // all id room
};

export type TBot = {
  id?: string;
  fullName: string;
  avatar: string;
  createdAt: number;
  updatedAt: number;
  chats: string[]; // all id room
  type: "bot" | "user";
};
