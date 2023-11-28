import {Model} from "./model.ts";

export class Collection extends Model {
    protected static endpoint = "/collections"

    declare id:number
    declare name: string
    declare readonly created_at: string
    declare readonly updated_at: string
}