import express from "express"
import logger from "../helpers/logger"

import ValidationError from "../errors/ValidationError"
import ForbiddenError from "../errors/ForbiddenError"
import UnauthorizedError from "../errors/UnauthorizedError"
import NotFoundError from "../errors/NotFoundError"

export default (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(error.message);

    if (error instanceof ValidationError ||
        error instanceof UnauthorizedError ||
        error instanceof ForbiddenError ||
        error instanceof NotFoundError
    ) {
        return res.status(error.statusCode).json({ error: true, message: error.message });
    }
    else if (error.name === "ValidationError") {
        return res.status(400).json(error.message);
    }
    else if (error.name === "SyntaxError") {
        return res.status(400).json("Syntax error");
    }
    else if (error.name === "PayloadTooLargeError") {
        return res.status(413).json("Request size too large");
    }
    else {
        return res.status(500).json("Internal Server Error");
    }
}