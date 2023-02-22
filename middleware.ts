import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

const APP_USER = process.env.APP_USER;
const APP_PASSWORD = process.env.APP_PASSWORD;

if (!APP_USER || !APP_PASSWORD) {
    throw new Error(
        "APP_USER and APP_PASSWORD environment variables are required"
    );
}

export const middleware = createNextAuthMiddleware(
    process.env.ENVIRONMENT !== "development"
        ? {
              users: [{ name: APP_USER, password: APP_PASSWORD }],
          }
        : {}
);

export const config = {
    matcher: ["/(.*)", "/_next/static/chunks/(.*)"],
};
