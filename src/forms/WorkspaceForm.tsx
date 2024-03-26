import WorkspaceRepository from "@/repositories/workspaceRepository";
import { CreateWorkspaceRequest } from "@/types/workspace";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export default function WorkspaceForm() {
  const queryClient = useQueryClient();

  const [workspace, setWorkspace] = useState<CreateWorkspaceRequest>({
    name: "",
  });

  const createWorkspaceMutation = useMutation({
    mutationFn: async (workspace: CreateWorkspaceRequest) =>
      await WorkspaceRepository.create(workspace),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["workspaces"]);
      setWorkspace({ name: "" });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createWorkspaceMutation.mutate(workspace);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name">Nom:</label>
        <input
          type="text"
          className="border border-gray-200 rounded p-1"
          value={workspace.name}
          onChange={(e) =>
            setWorkspace((workspace) => ({
              ...workspace,
              name: (e.target as HTMLInputElement).value,
            }))
          }
        ></input>
      </div>
      <button className="border border-gray-200 rounded">Créer</button>
    </form>
  );
}
