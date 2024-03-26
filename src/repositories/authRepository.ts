import Repository from "./repository";
import {OATToken} from "@/types/OATToken.ts";
import {User} from "@/types/user.ts";

export default class AuthRepository extends Repository {
    private static endpoint = `${this.API_URL}`;

    public static async login(credentials: { email: string, password: string }): Promise<{ token: OATToken, user: User }> {
        const response = await fetch(`${this.endpoint}/login`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error(response.statusText);
        return await response.json() as { token: OATToken, user: User }
    }

    public static async logout(): Promise<boolean> {
        const response = await fetch(`${this.endpoint}/logout`, {
            method: "POST",
            headers: this.getHeaders(),
        });
        if (!response.ok) throw new Error(response.statusText);
        return response.ok
    }
}
