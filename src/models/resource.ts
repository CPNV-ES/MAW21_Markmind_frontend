import {Model} from "./model.ts";

export class Resource extends Model {
    protected static endpoint = "/resources"

    declare id:number
    declare name: string
    declare content: string
    declare readonly created_at: string
    declare readonly updated_at: string
}