import { Collection } from "./collection";

export type Workspace = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  collections: Collection[];
};

export type CreateWorkspaceRequest = {
  name: string;
};
