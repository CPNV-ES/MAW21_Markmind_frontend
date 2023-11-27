import { useState } from "react";
import workspaces from "../../../../../data/workspaces";

type WorkspaceModalProps = { isOpen: boolean };
const WorkspaceModal = ({ isOpen }: WorkspaceModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {workspaces.map((workspace)=> (
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
      <h1>{workspace}</h1>
      <WorkspaceModal isOpen={isOpen} />
    </div>
  );
}
