import { create } from "zustand";
import {User} from "@/types/user.ts";
import {OATToken} from "@/types/OATToken.ts";
import { persist } from "zustand/middleware";

type Session = { user: User, token: OATToken }

type SessionStore = {
    session: Session | undefined,
    setSession: (session: Session) => void,
    getUser: () => User | undefined,
    isAuthenticated: () => boolean,
    logout: () => void
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set, get) => (
            {
                session: undefined,
                setSession: (session: Session) => set((state) => ({...state, session})),
                logout: () => set((state) => ({ ...state, session: undefined })),
                getUser: () => get().session?.user,
                isAuthenticated: () => !!get().session
            }
        ),
        {
            name: "sessionStorage"
        }
    )
);
