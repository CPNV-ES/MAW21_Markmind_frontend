import ResourceRepository from "@/repositories/resourceRepository";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Collection as CollectionType } from "@/types/collection";
import { CreateResourceRequest } from "@/types/resources";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

type ResourceFormProps = {
  collection: CollectionType;
};
export default function ResourceForm({ collection }: ResourceFormProps) {
  const queryClient = useQueryClient();
  const { selectedWorkspace } = useSidebarStore();

  const [resource, setResource] = useState<CreateResourceRequest>({
    name: "",
    content: "Tapez votre contenu ici...",
    collectionId: collection.id,
  });

  const createResourceMutation = useMutation({
    mutationFn: async (resource: CreateResourceRequest) =>
      await ResourceRepository.create(resource),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "workspaces",
        selectedWorkspace?.id,
      ]);
      setResource((resource) => ({ ...resource, name: "" }));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createResourceMutation.mutate(resource);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          className="border border-gray-200 rounded p-1"
          value={resource.name}
          onChange={(e) =>
            setResource((resource) => ({
              ...resource,
              name: (e.target as HTMLInputElement).value,
            }))
          }
        ></input>
      </div>
      <button className="border border-gray-200 rounded">Créer</button>
    </form>
  );
}
