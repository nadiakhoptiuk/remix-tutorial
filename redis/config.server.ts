// --------------------------- FOR IO REDIS

// import Redis from "ioredis";

// const redisClient = new Redis({
//   port: 12000,
//   host: "localhost",
//   // username: "example@mail.mail",
//   // password: "11111111",
// });

// export default redisClient;

// --------------------------- FOR REDIS OM

import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:12000",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();
