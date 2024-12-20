// import { Entity, Repository, Schema } from "redis-om";
// import { redisClient } from "./config.server";

// class Person extends Entity {
//   firstName!: string;
//   lastName!: string;
//   age!: number;
//   verified!: boolean;
//   skills!: string[];
// }

// const personSchema = new Schema("person", {
//   firstName: { type: "string" },
//   lastName: { type: "string" },
//   age: { type: "number" },
//   verified: { type: "boolean" },
//   skills: { type: "string[]" },
// });

// export const personRepository = new Repository(personSchema, redisClient);

// await personRepository.createIndex();
