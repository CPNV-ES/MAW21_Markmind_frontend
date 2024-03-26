import { useSessionStore } from "@/stores/useSessionStore.ts";

export default class Repository {
  protected static API_URL = "http://localhost:3333/api/v1";

  protected static getHeaders(): HeadersInit {
    const session = useSessionStore.getState().session;
    return {
      "Content-Type": "application/json",
      "Authorization": session ? `${session.token.type} ${session.token.token}` : "",
    };
  }
}
