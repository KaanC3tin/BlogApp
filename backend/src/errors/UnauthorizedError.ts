export default class UnauthorizedError extends Error {
    message: string
    statusCode: number;
    constructor() {
        super("Unauthorized Error");
        this.statusCode = 401;
        this.message = "You are not authorized to access this resource.";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

