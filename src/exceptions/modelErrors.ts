export class ModelErrors extends Error {
    public errors: { [key: string]: string };
    public status: number

    constructor(message: string, status: number, errors: { [key: string]: string }) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = 'ModelErrors';
        this.errors = errors
        this.status = status
    }
}