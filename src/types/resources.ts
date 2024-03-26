export type Resource = {
  id: number;
  name: string;
  content: string;
  collection_id: number;
  created_at: string;
  updated_at: string;
};

export type CreateResourceRequest = {
  name: string;
  content: string;
  collectionId: number;
};
