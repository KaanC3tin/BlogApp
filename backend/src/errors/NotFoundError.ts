export default class NotFoundError extends Error {
    statusCode: number;
    message: string;
    constructor(message: string) {
        super("Not Found Error");
        this.statusCode = 404;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}