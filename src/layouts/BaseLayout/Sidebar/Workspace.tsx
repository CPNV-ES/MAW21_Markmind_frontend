import { Workspace as WorkspaceType } from "@/types/workspace";
import Collection from "./Collection";

type WorkspaceProps = {
  workspace: WorkspaceType | undefined;
  isLoading?: boolean;
};
export default function Workspace({ workspace, isLoading }: WorkspaceProps) {
  if (isLoading) return "Chargement...";
  if (!workspace) return null;
  return (
    <div className="flex flex-col gap-4 my-4">
      {workspace.collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
