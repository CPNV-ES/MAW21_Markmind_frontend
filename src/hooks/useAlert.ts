import { useAlertStore } from "@/stores/useAlertStore";
export function useAlert() {
  const { isOpen, setIsOpen } = useAlertStore();
  const openAlert = (title: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setIsOpen({ title, resolve });
    });
  };
  return { isOpen, setIsOpen, openAlert };
}
