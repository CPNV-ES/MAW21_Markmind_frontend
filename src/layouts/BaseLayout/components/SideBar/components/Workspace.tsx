import { PropsWithChildren, useEffect, useState } from "react";
import { Workspace as WorkspaceModel } from "../../../../../models/workspace";
import { useNavigate } from "react-router-dom";
import { Resource as ResourceModel } from "../../../../../models/resource";
import styles from "../SideBar.module.scss";
import { CiCirclePlus, CiTrash } from "react-icons/ci";

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
  const handleDeleteClick = async () => {
    await WorkspaceModel.delete(id);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <li onClick={handleClick} className={styles.workspace_modal_item}>
      <div className={styles.row}>
        <div className={styles.workspace_modal_item_name}>{children}</div>
        <div className={styles.buttons} onClick={handleDeleteClick}>
          <CiTrash size={20} />
        </div>
      </div>
    </li>
  );
};

type WorkspaceModalProps = { isOpen: boolean };
const WorkspaceModal = ({ isOpen }: WorkspaceModalProps) => {
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
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div>
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
    </div>
  );
};

type WorkspaceProps = { workspace: string | undefined | null };
export default function Workspace({ workspace }: WorkspaceProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div onClick={handleClick}>
      <h1>{workspace ? workspace : "Choisir un workspace"}</h1>
      <WorkspaceModal isOpen={isOpen} />
    </div>
  );
}
