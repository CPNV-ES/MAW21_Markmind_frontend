import { createPortal } from "react-dom";
import Modal, { ModalProps } from "../Modal";
import styles from "./confirmModal.module.scss";

type ConfirmModalProps = ModalProps & { onValidate: () => void };
const ConfirmModal = ({
  isOpen,
  onClose,
  onValidate,
  children,
}: ConfirmModalProps) => {
  return createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        {children}
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.secondBtn}>
            Annuler
          </button>
          <button onClick={onValidate} className={styles.primaryBtn}>
            Supprimer
          </button>
        </div>
      </div>
    </Modal>,
    document.getElementById("root")!
  );
};

export default ConfirmModal;
