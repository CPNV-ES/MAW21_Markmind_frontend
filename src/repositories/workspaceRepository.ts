import { CreateWorkspaceRequest, Workspace } from "@/types/workspace";
import Repository from "./repository";

export default class WorkspaceRepository extends Repository {
  private static endpoint = `${this.API_URL}/workspaces`;

  public static async all(): Promise<Workspace[]> {
    const response = await fetch(this.endpoint, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Workspace[];
  }

  public static async one(id: number | string): Promise<Workspace> {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Workspace;
  }

  public static async create(
    workspace: CreateWorkspaceRequest
  ): Promise<Workspace> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(workspace),
    });
    if (!response.ok) throw new Error(response.statusText);

    return (await response.json()) as Workspace;
  }

  public static async delete(id: number | string): Promise<void> {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error(response.statusText);
  }
}
