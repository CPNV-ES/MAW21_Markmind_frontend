import Modal from "@/components/modal/Modal";
import { useAlert } from "@/hooks/useAlert";

export default function GlobalAlert() {
  const { isOpen, setIsOpen } = useAlert();
  const handleConfirm = (confirm: boolean) => {
    setIsOpen(false);
    if (isOpen) {
      isOpen.resolve(confirm);
    }
  };

  return (
    <Modal
      isOpen={!!isOpen}
      title=""
      header={<span>{isOpen && isOpen.title}</span>}
      footer={
        <>
          <button onClick={() => handleConfirm(false)}>Annuler</button>
          <button onClick={() => handleConfirm(true)}>Accepter</button>
        </>
      }
    >
      {isOpen && isOpen.title}
    </Modal>
  );
}
