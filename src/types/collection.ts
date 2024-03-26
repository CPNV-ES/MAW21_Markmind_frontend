import { Resource } from "./resources";

export type Collection = {
  id: number;
  name: string;
  workspace_id: number;
  created_at: string;
  updated_at: string;
  resources: Resource[];
};

export type CreateCollectionRequest = {
  name: string;
  workspaceId: number;
};
