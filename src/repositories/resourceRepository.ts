import { CreateResourceRequest } from "@/types/resources";
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
}
