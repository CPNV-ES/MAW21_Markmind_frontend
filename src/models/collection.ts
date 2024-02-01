import {Model} from "./model.ts";
import { Resource } from "./resource.ts";

export class Collection extends Model {
    protected static endpoint = "/collections"

    declare id:number
    declare name: string
    declare resources: Resource[]
    declare readonly created_at: string
    declare readonly updated_at: string
}