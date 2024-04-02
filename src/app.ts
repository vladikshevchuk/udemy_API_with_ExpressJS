import express, { Express } from "express";
import { Server } from "http";
import { UserController } from "./users/users.controller";
import { ExeptionFiltres } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILogger;
  userController: UserController;
  exeptionFilter: ExeptionFiltres;

  constructor(
    logger: ILogger,
    userController: UserController,
    exeptionFilter: ExeptionFiltres
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFiltres() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFiltres();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
