import {ENDPOINT_URL} from "../../config/constantes.ts";
export type Data = {[key:string]: unknown}
export enum Method {
    HEAD = "HEAD",
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
}

export abstract class ApiService {
    protected static endpoint: string = ""


    public static url(params: string = ""):string {
        return ENDPOINT_URL + this.endpoint + params
    }
}