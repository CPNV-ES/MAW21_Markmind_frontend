import { useSidebarStore } from "@/stores/useSidebarStore";
import { Workspace } from "@/types/workspace";
import { ChangeEvent } from "react";

type WorkspaceSelectorProps = {
  workspaces: Workspace[] | undefined;
};
export default function WorkspaceSelector({
  workspaces,
}: WorkspaceSelectorProps) {
  const { setSelectedWorkspace, selectedWorkspace } = useSidebarStore();

  const handleChanges = (e: ChangeEvent) => {
    const value = (e.target as HTMLSelectElement).value;
    const workspace = workspaces?.find(
      (workspace) => workspace.id === parseInt(value)
    );
    setSelectedWorkspace(workspace);
  };

  return (
    <div className="w-full p-1 border border-gray-400 rounded">
      <select
        className="w-full h-[40px] bg-transparent"
        onChange={handleChanges}
        value={selectedWorkspace?.id}
      >
        <option value={undefined}>Sélectionner...</option>
        {workspaces?.map((workspace) => (
          <option value={workspace.id} key={workspace.id}>
            {workspace.name}
          </option>
        ))}
      </select>
    </div>
  );
}
