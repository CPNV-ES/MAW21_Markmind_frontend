import { CreateCollectionRequest } from "@/types/collection";
import Repository from "./repository";

export default class CollectionRepository extends Repository {
  private static endpoint = `${this.API_URL}/collections`;

  public static async delete(id: number | string): Promise<void> {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error(response.statusText);
  }

  public static async create(
    collection: CreateCollectionRequest
  ): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(collection),
    });
    if (!response.ok) throw new Error(response.statusText);
  }
}
