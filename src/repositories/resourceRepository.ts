import { CreateResourceRequest, Resource } from "@/types/resources";
import Repository from "./repository";

export default class ResourceRepository extends Repository {
  private static endpoint = `${this.API_URL}/resources`;

  public static async create(resource: CreateResourceRequest): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(resource),
    });
    if (!response.ok) throw new Error(response.statusText);
  }

  public static async one(id: number | string): Promise<Resource> {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Resource;
  }

  public static update = async (id: number | string, resource: CreateResourceRequest): Promise<void> => {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(resource),
    });
    if (!response.ok) throw new Error(response.statusText);
  }
}
