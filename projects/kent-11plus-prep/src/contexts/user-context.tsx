"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getUsers, type AppUser } from "@/lib/supabase/users";

/* ------------------------------------------------------------------ */
/*  Context shape                                                      */
/* ------------------------------------------------------------------ */

interface UserContextValue {
  users: AppUser[];
  currentUser: AppUser | null;
  setCurrentUser: (user: AppUser) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextValue>({
  users: [],
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
});

/* ------------------------------------------------------------------ */
/*  Storage key for persisting the selected user across refreshes      */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "kent11plus_current_user_id";

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [currentUser, setCurrentUserState] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((fetched) => {
      setUsers(fetched);

      // Restore previously selected user from localStorage
      const savedId =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      const restored = savedId
        ? fetched.find((u) => u.id === savedId)
        : undefined;

      // Default to TEST user if nothing saved
      const fallback = restored ?? fetched.find((u) => u.is_test) ?? fetched[0];
      if (fallback) setCurrentUserState(fallback);
      setLoading(false);
    });
  }, []);

  function setCurrentUser(user: AppUser) {
    setCurrentUserState(user);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, user.id);
    }
  }

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useUser() {
  return useContext(UserContext);
}
