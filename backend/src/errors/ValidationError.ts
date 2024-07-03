export default class ValidationError extends Error {
    statusCode: number;
    message: string;
    constructor(message: string) {
        super("Validation Error");
        this.statusCode = 400;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}