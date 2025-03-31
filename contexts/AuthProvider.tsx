import { auth, db } from "@/firebaseConfig";
import { TUser } from "@/types/user";
import { generateid } from "@/utils/generateId";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useMemo } from "react";

type TAuthContext = {
  user: TUser | null;
  handleLogin: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<TAuthContext>({
  user: null,
  handleLogin: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<TUser | null>(null);

  // createUserWithEmailAndPassword(auth, "minhnv155@gmail.com", "123456")
  //   .then(async (userCredential) => {
  //     // Signed up
  //     const user = userCredential.user;
  //     // ...
  //     const idDoc = generateid();
  //     const docData: TUser = {
  //       id: idDoc,
  //       email: user.email ?? "",
  //       password: "",
  //       phone: "",
  //       fullName: "",
  //       settingId: [],
  //       chats: [],
  //       bankAccounts: [],
  //       wallet: {
  //         balance: 0,
  //         transaction: [],
  //       },
  //       friends: [],
  //     };

  //     await setDoc(doc(db, "users", idDoc), docData);
  //   })
  //   .catch((error) => {
  //     const auth = getAuth();
  //     auth.currentUser?.delete();

  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //     console.log({ errorCode, errorMessage });
  //   });

  const value = useMemo(() => {
    return {
      user,
      handleLogin: (email: string, password: string) => {
        console.log({ email, password });
        signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredentail) => {
            // const user = userCredentail.user;

            const userQuery = query(
              collection(db, "users"),
              where("email", "==", email)
            );
            const docs = await getDocs(userQuery);
            if (!docs.empty) {
              setUser(docs.docs[0].data() as TUser);
              // router.push("/(tabs)/(home)");
              router.push({
                pathname: "/plans/[id]/schedule",
                params: { id: "336278a9-5ae8-4f8f-8710-4131211609db" },
              })
              // router.push({
              //   pathname: "/plans/[id]/schedule",
              //   params: { id: "b725bc6e-11de-4b67-8096-f319ece1ce56" },
              // });
            }
          })
          .catch((e) => {
            console.log({ code: e.code, message: e.message });
          });
      },
      logout: () => {
        auth.signOut().then(() => {
          setUser(null);
          router.navigate("/(auth)/login1");
        });
      },
    };
  }, [user]);

  console.log(value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return {
    ...context,
    user: context.user as TUser,
  };
};

export default AuthProvider;
