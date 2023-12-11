import { useEffect, useState } from "react";
import { Workspace as WorkspaceModel } from "../../../../../models/workspace";
import styles from "../SideBar.module.scss";

type WorkspaceJson = {
  id: number;
  name: string;
  updated_at: string;
  created_at: string;
}[];

type WorkspaceModalProps = { isOpen: boolean };
const WorkspaceModal = ({ isOpen }: WorkspaceModalProps) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceJson>([]);

  useEffect(() => {
    (async () => {
      const data = await WorkspaceModel.getAll();
      setWorkspaces(data);
    })();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.row}>
          <h1>Workspaces</h1>
          <div className={styles.buttons}>
            <button>Bouton 1</button>
            <button>Bouton 2</button>
          </div>
        </div>
      </div>
      <div className={styles.workspaceList}>
        <ul>
          {workspaces.map((workspace) => (
            <li key={workspace.id} className={styles.workspaceItem}>
              <button className={styles.workspaceButton}>
                <h2>{workspace.name}</h2>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type WorkspaceProps = { workspace: string };
export default function Workspace({ workspace }: WorkspaceProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div onClick={handleClick}>
      <div className={styles.btn_current_workspace}>
        <h1>{workspace}</h1>
      </div>
      <WorkspaceModal isOpen={isOpen} />
    </div>
  );
}
