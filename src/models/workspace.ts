import {Model} from "./model.ts";

export class Recipe extends Model {
    protected static endpoint = "/recipes"

    declare id:number
    declare name: string
    declare readonly created_at: string
    declare readonly updated_at: string
}