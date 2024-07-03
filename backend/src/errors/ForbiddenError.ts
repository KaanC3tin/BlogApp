export default class ForbiddenError extends Error {
    statusCode: number;
    message: string;
    constructor(message: string) {
        super("Forbidden Error");
        this.statusCode = 403;
        this.message = "You do not have permission to access this resource.";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}