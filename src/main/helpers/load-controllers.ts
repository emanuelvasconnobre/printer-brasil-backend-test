import { readdir } from "fs/promises";
import { join } from "path";
import { BaseController } from "@modules/controllers/protocols/base-controller";

export const loadControllers = async (): Promise<BaseController[]> => {
  const controllersPath = join(__dirname, "../../controllers");
  const files = await readdir(controllersPath);
  const controllers: BaseController[] = [];

  await Promise.all(
    files.map(async (file) => {
      if (file.endsWith(".ts") || file.endsWith(".js")) {
        const controllerModule = await import(`@modules/controllers/${file}`);
        for (const controllerExport in controllerModule) {
          const controllerClass = controllerModule[controllerExport];
          if (
            typeof controllerClass === "function" &&
            controllerClass.prototype instanceof BaseController
          ) {
            controllers.push(new controllerClass());
          }
        }
      }
    })
  );

  return controllers;
};
