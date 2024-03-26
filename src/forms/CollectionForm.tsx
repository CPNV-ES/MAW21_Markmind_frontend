import CollectionRepository from "@/repositories/collectionRepository";
import { CreateCollectionRequest } from "@/types/collection";
import { Workspace as WorkspaceType } from "@/types/workspace";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

type CollectionFormProps = {
  workspace: WorkspaceType;
};
export default function CollectionForm({ workspace }: CollectionFormProps) {
  const queryClient = useQueryClient();

  const [collection, setCollection] = useState<CreateCollectionRequest>({
    name: "",
    workspaceId: workspace.id,
  });

  const createCollectionMutation = useMutation({
    mutationFn: async (collection: CreateCollectionRequest) =>
      await CollectionRepository.create(collection),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["workspaces", workspace.id]);
      setCollection((collection) => ({ ...collection, name: "" }));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCollectionMutation.mutate(collection);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          value={collection.name}
          className="border border-gray-200 rounded p-1"
          onChange={(e) =>
            setCollection((collection) => ({
              ...collection,
              name: (e.target as HTMLInputElement).value,
            }))
          }
        ></input>
      </div>
      <button className="border border-gray-200 rounded">Créer</button>
    </form>
  );
}
