import { PropsWithChildren, useEffect, useState } from "react";
import styles from "./modal.module.scss";

export type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
} & PropsWithChildren;
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.row}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
