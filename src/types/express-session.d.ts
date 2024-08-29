
declare global {
  import "express-session";

  module "express-session" {
    interface SessionData {
      user: {
        id: string;
        name: string;
        username: string;
        email: string;
      };
    }
  }
}
