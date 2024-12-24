// --------------------------- FOR IO REDIS

import Redis from "ioredis";
import { createClient } from "redis";

export const redisIoClient = new Redis({
  port: Number(process.env.PORT) || 12000,
  host: process.env.HOST || "localhost",
});

// --------------------------- FOR REDIS OM

export const redisOmClient = createClient({
  url: process.env.REDIS_URL,
});

redisOmClient.on("error", (err) => console.log("Redis Client Error", err));

await redisOmClient.connect();
