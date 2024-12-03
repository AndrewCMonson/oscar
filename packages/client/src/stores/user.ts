import { User, UserMetadata } from "auth0";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  userMetadata: UserMetadata | null;
  setUser: (user: User) => void;
  setUserMetadata: (userMetadata: UserMetadata) => void;
  clearUser: () => void;
}


export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      userMetadata: null,
      setUserMetadata: (userMetadata) => set({ userMetadata }),
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null, userMetadata: null })
    }),
    {
      name: "OSCUS-USE",
      storage: {
        getItem: (name) => {
          const item = Cookie.get(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          Cookie.set(name, JSON.stringify(value), { sameSite: "lax" });
        },
        removeItem: (name) => {
          Cookie.remove(name);
        },
      },
    },
  ),
);