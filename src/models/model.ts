import { ApiService, Data, Method } from "../services/api/apiService.ts";
import { ModelErrors } from "../exceptions/modelErrors.ts";
import { Convert } from "../services/convert.ts";

type ApiServiceConstructor<T extends ApiService> = {
    new(): T
    url(params?: string): string,
}

export type PaginateModel<T> = {
    data: T[]
    meta: {
        current_page: number
        from: number
        last_page: number
        path: string
        per_page: number
        to: number
        total: number
    }
}

export abstract class Model extends ApiService {

    public static async getAll<T extends Model>(this: ApiServiceConstructor<T>, options: RequestInit = {}): Promise<T[]> {
        const request = await fetch(this.url(), {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            ...options
        })
        if (!request.ok) {
            const errors = await request.json()
            throw new ModelErrors(errors.message, request.status, errors.errors)
        }
        return await request.json()
    }

    public static async getOne<T extends Model>(this: ApiServiceConstructor<T>, id: number | string, options: RequestInit = {}): Promise<T> {
        const request = await fetch(this.url(`/${id}`), {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`

            },
            ...options
        })
        if (!request.ok) {
            const errors = await request.json()
            throw new ModelErrors(errors.message, request.status, errors.errors)
        }
        return (await request.json())
    }

    public static async update<T extends Model>(this: ApiServiceConstructor<T>, id: number | string, data: Data, options: RequestInit = {}): Promise<T> {
        const formData = Convert.jsonToFormData(data);
        formData.append('_method', Method.PATCH);
        const request = await fetch(this.url(`/${id}`), {
            method: Method.POST,
            headers: {
                'Accept': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`

            },
            body: formData,
            ...options
        })
        if (!request.ok) {
            const errors = await request.json()
            throw new ModelErrors(errors.message, request.status, errors.errors)
        }
        return (await request.json()).data
    }

    public static async create<T extends Model>(this: ApiServiceConstructor<T>, data: Data, options: RequestInit = {}): Promise<T> {
        const request = await fetch(this.url(), {
            method: Method.POST,
            headers: {
                'Accept': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`

            },
            body: Convert.jsonToFormData(data),
            ...options
        })
        if (!request.ok) {
            const errors = await request.json()
            throw new ModelErrors(errors.message, request.status, errors.errors)
        }
        return (await request.json()).data
    }

    public static async delete<T extends Model>(this: ApiServiceConstructor<T>, id: number, options: RequestInit = {}): Promise<boolean> {
        const request = await fetch(this.url(`/${id}`), {
            method: Method.DELETE,
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            ...options
        })
        return request.ok
    }
}
