import { Workspace } from "@/types/workspace";
import { create } from "zustand";

type SidebarStore = {
  selectedWorkspace: Workspace | undefined;
  setSelectedWorkspace: (value: Workspace | undefined) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  selectedWorkspace: undefined,
  setSelectedWorkspace: (value: Workspace | undefined) =>
    set((state) => ({ ...state, selectedWorkspace: value })),
}));
