import Modal from "@/components/modal/Modal";
import { useModal } from "@/hooks/useModal";

export default function GlobalAlert() {
  const { isOpen, setIsOpen } = useModal();

  return (
    <Modal
      isOpen={!!isOpen}
      title={(isOpen && isOpen.title) || ""}
      onClose={() => setIsOpen(false)}
    >
      {isOpen && isOpen.content}
    </Modal>
  );
}
