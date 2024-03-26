import { create } from "zustand";

type OpenAlertType =
  | { title: string; resolve: (value: boolean) => void }
  | false;

type AlertStore = {
  isOpen: OpenAlertType;
  setIsOpen: (value: OpenAlertType) => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: OpenAlertType) => set((state) => ({ ...state, isOpen })),
}));
