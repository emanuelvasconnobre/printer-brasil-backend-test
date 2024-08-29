import { Application } from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";

export const sessionHandler = (app: Application) => {
  app.disable("X-Powered-By");
  app.set("trust proxy", 1);
  
  const pgSessionInstance = pgSession(session);

  const isProduction = process.env.NODE_ENV === "prod";
  let cookiesConfig: session.CookieOptions;

  if (isProduction) {
    cookiesConfig = {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    };
  } else {
    cookiesConfig = {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    };
  }

  app.use(
      session({
        store: new pgSessionInstance({
          conObject: {
            connectionString: process.env.POSTGRES_URL,
          },
          createTableIfMissing: true,
          tableName: "session",
        }),
        secret: process.env["SECRET"] || "secret",
        resave: false,
        saveUninitialized: true,
        cookie: cookiesConfig,
      })
  );
};
