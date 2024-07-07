import crypto from "crypto";

export const sha256Hash = (data: string): string => crypto.createHmac("sha256", process.env.HASH_SECRET as string).update(data).digest("hex");
export const compareHash = (data: string, hash: string): boolean => hash === crypto.createHmac("sha256", process.env.HASH_SECRET as string).update(data).digest("hex")