import { Express } from "express";

import "reflect-metadata";

import { PostgresDatabase } from "./data/postgres/postgres_databases";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

import { envs } from "./config";

async function main() {
  const postgres = new PostgresDatabase({
    username: envs.USERNAME_DATABASE,
    password: envs.PASSWORD_DATABASE,
    host: envs.HOST_DATABASE,
    database: envs.DATABASE,
    port: envs.PORT_DATABASE,
  });

  await postgres.connect();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  await server.start();
}
main();
