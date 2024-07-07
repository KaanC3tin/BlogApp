class CustomError extends Error {
    statusCode: number;
    message: string;
    description: string;
    constructor(statusCode: number, message: string, description: string) {
        super(message);
        this.statusCode = statusCode;
        this.description = description;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default CustomError;