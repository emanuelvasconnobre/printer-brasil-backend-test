import { Application } from "express";
import { loadControllers } from "@modules/main/helpers";

export const registerControllersHandler = async (app: Application) => {
  const controllers = await loadControllers();
  controllers.forEach((controller) => {
    app.use("/", controller.router);
  });
};
