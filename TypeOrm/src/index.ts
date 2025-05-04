// connect to Postgres
import { createConnection } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Bankers";
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Wasi1815",
      database: "typeorm",
      entities: [Client, Banker],
      synchronize: true,
    });
    console.log("Connected to Postgres");
  } catch (error) {
    console.error(error);
    throw new Error("Unable to Connect to Postgres");
  }
};

main();
