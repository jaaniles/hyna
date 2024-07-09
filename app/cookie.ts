import { createCookie } from "@remix-run/node";

const cookieSecret = process.env.cookieSecret || "";

export const session = createCookie("session", {
  secrets: [cookieSecret],
  expires: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000),
  path: "/",
});
