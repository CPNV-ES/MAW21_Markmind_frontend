import ResourceForm from "@/forms/ResourceForm";
import { useAlert } from "@/hooks/useAlert";
import { useModal } from "@/hooks/useModal";
import CollectionRepository from "@/repositories/collectionRepository";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Collection as CollectionType } from "@/types/collection";
import { CirclePlus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import Resource from "./Resource";

type CollectionProps = {
  collection: CollectionType;
};
export default function Collection({ collection }: CollectionProps) {
  const { openModal } = useModal();
  const { openAlert } = useAlert();
  const { selectedWorkspace } = useSidebarStore();
  const queryClient = useQueryClient();

  const deleteCollectionMutation = useMutation({
    mutationFn: async () => {
      await CollectionRepository.delete(collection.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "workspaces",
        selectedWorkspace?.id,
      ]);
    },
  });

  const handleNewResourceClick = () => {
    openModal("Nouvelle ressource", <ResourceForm collection={collection} />);
  };

  const handleDeleteCollectionClick = async () => {
    if (await openAlert("Êtes-vous sûr de vouloir supprimer la collection ?")) {
      deleteCollectionMutation.mutate();
    }
  };

  if (!collection) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h1>{collection.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteCollectionClick}
            className="rounded-xl h-[20px] w-[20px] flex justify-center items-center p-0 m-0 hover:text-red-500"
          >
            <Trash2 />
          </button>
          <button
            onClick={handleNewResourceClick}
            className="rounded-xl h-[20px] w-[20px] flex justify-center items-center p-0 m-0 hover:text-green-500"
          >
            <CirclePlus />
          </button>
        </div>
      </div>
      {collection.resources.map((resource) => (
        <Resource key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
