import { useModalStore } from "@/stores/useModalStore";
import { ReactNode } from "react";
export function useModal() {
  const { isOpen, setIsOpen } = useModalStore();
  const openModal = (title: string, content: ReactNode) => {
    setIsOpen({ title, content });
  };
  return { isOpen, setIsOpen, openModal };
}
