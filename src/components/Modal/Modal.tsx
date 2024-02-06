import { PropsWithChildren, useState } from "react";

type ModalProps = { isOpen: boolean; onClose?: () => void } & PropsWithChildren;
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
