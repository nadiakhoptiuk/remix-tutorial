import { Repository, Schema } from "redis-om";
import { redisOmClient } from "./config.server";

const personSchema = new Schema(
  "person",
  {
    firstName: { type: "string" },
    lastName: { type: "string" },
    age: { type: "number" },
    verified: { type: "boolean" },
    skills: { type: "string[]" },
  },
  {
    dataStructure: "JSON",
  }
);

export const personRepository = new Repository(personSchema, redisOmClient);

await personRepository.createIndex();
