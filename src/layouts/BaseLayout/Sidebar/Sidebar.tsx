import CollectionForm from "@/forms/CollectionForm";
import WorkspaceForm from "@/forms/WorkspaceForm";
import { useAlert } from "@/hooks/useAlert";
import { useModal } from "@/hooks/useModal";
import AuthRepository from "@/repositories/authRepository.ts";
import WorkspaceRepository from "@/repositories/workspaceRepository";
import { useSessionStore } from "@/stores/useSessionStore.ts";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { LogOutIcon, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Workspace from "./Workspace";
import WorkspaceSelector from "./WorkspaceSelector";

type UserInfoProps = { name: string | null | undefined };
function UserInfo({ name }: UserInfoProps) {
  const navigate = useNavigate();
  const { logout } = useSessionStore();

  const logoutMutation = useMutation({
    mutationFn: async () => await AuthRepository.logout(),
    onSuccess: () => {
      logout();
      navigate("/");
    },
  });

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="h-[35px] flex justify-around items-center">
      <span>{name ? name : "Se connecter"}</span>
      <button
        onClick={handleLogoutClick}
        className="w-[35px] h-[50px] ml-2 p-1 items-center h-full justify-center flex rounded hover:bg-gray-300"
      >
        <LogOutIcon size={20} />
      </button>
    </div>
  );
}

export default function Sidebar() {
  const { selectedWorkspace, setSelectedWorkspace } = useSidebarStore();
  const { openModal } = useModal();
  const { openAlert } = useAlert();
  const { getUser } = useSessionStore();

  const queryClient = useQueryClient();

  const { data: workspaces } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => WorkspaceRepository.all(),
    staleTime: Infinity,
  });

  const { data: workspace, isFetching: isWorkspaceFetching } = useQuery({
    queryKey: ["workspaces", selectedWorkspace?.id],
    queryFn: async () => {
      if (selectedWorkspace) {
        return WorkspaceRepository.one(selectedWorkspace.id);
      }
      return undefined;
    },
    staleTime: Infinity,
    retry: false,
  });

  const deleteWorkspaceMutation = useMutation({
    mutationFn: async () => {
      await WorkspaceRepository.delete(selectedWorkspace!.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["workspaces"]);
      setSelectedWorkspace(undefined);
    },
  });

  const handleNewWorkspaceClick = () => {
    openModal("Nouveau workspace", <WorkspaceForm />);
  };

  const handleDeleteWorkspace = async () => {
    if (await openAlert("Êtes-vous sûr de vouloir supprimer le workspace ?")) {
      deleteWorkspaceMutation.mutate();
    }
  };

  const handleNewCollectionClick = () => {
    if (selectedWorkspace) {
      openModal(
        "Nouvel collection",
        <CollectionForm workspace={selectedWorkspace} />
      );
    }
  };

  return (
    <aside className="bg-gray-100 text-black p-4 h-[100vh]">
      <nav className="w-full h-full grid grid-rows-[auto_1fr_auto] gap-2">
        <div>
          <UserInfo name={getUser()?.email} />
          <hr className="my-4" />
          <div className="flex w-full items-center justify-items-center">
            <WorkspaceSelector workspaces={workspaces} />
            {selectedWorkspace && (
              <button
                className="w-[65px] h-[50px] ml-2 p-1 items-center h-full justify-center flex rounded hover:bg-gray-300"
                onClick={handleDeleteWorkspace}
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
        <div className="overflow-y-scroll">
          <Workspace workspace={workspace} isLoading={isWorkspaceFetching} />
        </div>
        <div>
          {selectedWorkspace && (
            <button
              onClick={handleNewCollectionClick}
              className="w-full h-[30px] border border-gray-200 rounded hover:bg-gray-200 my-2"
            >
              Nouvelle collection
            </button>
          )}
        </div>
        <div>
          <button
            onClick={handleNewWorkspaceClick}
            className="w-full h-[30px] border border-gray-200 rounded hover:bg-gray-200 my-2"
          >
            Nouveau workspace
          </button>
        </div>
      </nav>
    </aside>
  );
}
