export default {
    MONGO_HOST: process.env.MONGO_HOST,
    REDIS_HOST: process.env.REDIS_HOST,
    HASH_SECRET: process.env.HASH_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET as string
}
