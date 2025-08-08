import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { create } from "zustand";

export type UserInfo = {
  name?: string;
  image?: string;
};

type State = {
  user?: FirebaseAuthTypes.User | null;
  image: string | null;
};

type Action = {
  storeUser: (currentUser: FirebaseAuthTypes.User | null) => void;
  storeUserInfo: (userInfo: UserInfo | null) => void;
  removeUser: () => void;
};

export const userStore = create<State & Action>((set) => ({
  user: null,
  image: "",
  storeUser: (currentUser: FirebaseAuthTypes.User | null) =>
    set(() => ({ user: currentUser || null })),
  storeUserInfo: (userInfo: UserInfo | null) =>
    set((state) => ({
      ...state,
      image: userInfo?.image,
    })),
  setCurrency: (currency: string) => set((state) => ({ ...state, currency })),
  removeUser: () => set(() => ({ user: null })),
}));
