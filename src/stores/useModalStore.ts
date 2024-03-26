import { ReactNode } from "react";
import { create } from "zustand";

type OpenModalType = { title: string; content?: ReactNode } | false;

type ModalStore = {
  isOpen: OpenModalType;
  setIsOpen: (value: OpenModalType) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: OpenModalType) => set((state) => ({ ...state, isOpen })),
}));
