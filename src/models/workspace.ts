import { Collection } from "./collection.ts";
import {Model} from "./model.ts";

export class Workspace extends Model {
    protected static endpoint = "/workspaces"

    declare id:number
    declare name: string
    declare collections: Collection[]
    declare readonly created_at: string
    declare readonly updated_at: string
}