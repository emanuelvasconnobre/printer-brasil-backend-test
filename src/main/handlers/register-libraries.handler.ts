import { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import { logger } from "@modules/config/winston";
import { ForbiddenHttpException } from "@modules/exceptions/http-exceptions";

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export const registerLibrariesHandler = (app: Application) => {
  app.use(morgan("combined", { stream }));

  const isProduction = process.env.NODE_ENV === "prod";

  if (isProduction) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

    const corsOptions = {
      origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(
            new ForbiddenHttpException({ message: "Not allowed by CORS" })
          );
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
  } else {
    app.use(
      cors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );
  }

  app.use(helmet());
};
