import { createClient } from 'redis';
import config from "../config/config"
import RedisStore from "connect-redis"

export const redisClient = createClient({
    url: config.REDIS_HOST
});

export const redisStore = new RedisStore({
    client: redisClient
});

export const connectRedis = async () => {
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();
}