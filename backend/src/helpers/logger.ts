import { format, transports } from "winston"
import winston from "winston";
export default winston.createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss"
        }),
        format.prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "log.txt" }),

    ]
}); //logger olarak import edilcek