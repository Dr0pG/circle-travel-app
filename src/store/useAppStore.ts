import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  isOnboardingSeen: boolean;
  setOnboardingSeen: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOnboardingSeen: false,
      setOnboardingSeen: (value) => set({ isOnboardingSeen: value }),
    }),
    {
      name: "circle-app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
