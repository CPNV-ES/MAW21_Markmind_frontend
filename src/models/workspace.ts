import {Model} from "./model.ts";

export class Workspace extends Model {
    protected static endpoint = "/workspaces"

    declare id:number
    declare name: string
    declare readonly created_at: string
    declare readonly updated_at: string
}