import { useEffect, useState } from "react";
import styles from "../SideBar.module.css";

type WorkspaceJson = {id: number, name: string, updated_at: string, created_at: string}[];

type WorkspaceModalProps = { isOpen: boolean };
const WorkspaceModal = ({ isOpen }: WorkspaceModalProps) => {

  const [workspaces, setWorkspaces] = useState<WorkspaceJson>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3333/api/v1/workspaces");
      const data = await response.json() as WorkspaceJson;
      setWorkspaces(data);
    })();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {workspaces.map((workspace) => (
        <p key={workspace.id}>{workspace.name}</p>
      ))}
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
      <button className={styles.btn_current_workspace}>
        <h1>{workspace}</h1>
      </button>
      <WorkspaceModal isOpen={isOpen} />
    </div>
  );
}
