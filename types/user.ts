export type TUser = {
  id: string;
  email: string;
  password: string;
  avatar?: string;
  phone: string;
  fullName: string;
  settingId: string[];
  identityCard?: {
    fullName: string;
    no: string;
    dob: number;
    sex: "Nam" | "Nữ";
    nationality: string;
    placeOfOrigin: string;
    placeOfResidence: string;
    avatar: string;
    // personalIndentication:
    createdAt: number;
    dateOfExpiry: number;
  };
  friends: string[]; // all id user
  chats: string[]; // all id room
  bankAccounts: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }[];
  wallet: {
    balance: number;
    transaction: {
      id: string;
      amount: number;
      type: "deposit" | "withdraw";
      createdAt: number;
    }[];
  };
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
