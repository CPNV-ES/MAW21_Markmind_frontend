import { MouseEvent, PropsWithChildren, useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../../../components/Modal/ConfirmModal/ConfirmModal";
import { Workspace as WorkspaceModel } from "../../../../../models/workspace";
import styles from "../SideBar.module.scss";

type WorkspaceJson = {
  id: number;
  name: string;
  updated_at: string;
  created_at: string;
}[];

const WorkspaceItem = ({
  children,
  id,
  onClick,
}: PropsWithChildren & { id: number; onClick?: (id: number) => void }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleOpenConfirmModal = (e: MouseEvent) => {
    e.stopPropagation();
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    await WorkspaceModel.delete(id);
    setShowConfirmationModal(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <li onClick={handleClick} className={styles.workspace_modal_item}>
      <ConfirmModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onValidate={handleConfirmDelete}
      >
        Êtes-vous sûr de vouloir supprimer ?
      </ConfirmModal>
      <div className={styles.row}>
        <div className={styles.workspace_modal_item_name}>{children}</div>
        <div className={styles.buttons} onClick={handleOpenConfirmModal}>
          <CiTrash size={20} />
        </div>
      </div>
    </li>
  );
};

type WorkspaceModalProps = { isOpen: boolean; onClose: () => void };
const WorkspaceModal = ({ isOpen, onClose }: WorkspaceModalProps) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceJson>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await WorkspaceModel.getAll();
      setWorkspaces(data);
    })();
  });

  const handleClick = (id: number) => {
    navigate(`/${id}`);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.workspaceSelector}>
      <ul className={styles.workspaceList}>
        {workspaces.map((workspace) => (
          <WorkspaceItem
            id={workspace.id}
            key={workspace.id}
            onClick={handleClick}
          >
            {workspace.name}
          </WorkspaceItem>
        ))}
      </ul>
    </div>
  );
};

type WorkspaceProps = { workspace: string | undefined | null };
export default function Workspace({ workspace }: WorkspaceProps) {
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);

  const handleClick = () => {
    setShowWorkspaceModal((showWorkspaceModal) => !showWorkspaceModal);
  };

  const onClose = () => {
    setShowWorkspaceModal(false);
  };

  return (
    <div>
      <h1 onClick={handleClick} style={{ margin: 0 }}>
        {workspace ? workspace : "Choisir un workspace"}
      </h1>
      <WorkspaceModal isOpen={showWorkspaceModal} onClose={onClose} />
    </div>
  );
}
