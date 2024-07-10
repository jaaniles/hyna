import {
  createCookieSessionStorage,
  createCookie,
  redirect,
} from "@remix-run/node";

import { db, auth as serverAuth, SESSION_EXPIRY } from "~/firebase.server";

const cookieSecret = process.env.cookieSecret || "";

export const session = createCookie("session", {
  secrets: [cookieSecret],
  expires: new Date(Date.now() + SESSION_EXPIRY),
  path: "/",
});

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [cookieSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function requireUserSession(request: Request) {
  const cookieSession = await storage.getSession(request.headers.get("Cookie"));
  const token = cookieSession.get("token");

  if (!token) {
    return null;
  }

  const tokenUser = await serverAuth.verifySessionCookie(token, true);

  if (!tokenUser) {
    return null;
  }

  const userProfile = await getSessionUserProfile(request);

  return {
    uid: tokenUser.uid,
    email: tokenUser.email,
    user: userProfile,
  };
}

export async function getUserSession(request: Request) {
  const cookieSession = await storage.getSession(request.headers.get("Cookie"));
  const token = cookieSession.get("token");

  if (!token) {
    return null;
  }

  try {
    const tokenUser = await serverAuth.verifySessionCookie(token, true);

    return tokenUser;
  } catch (error) {
    return null;
  }
}

export async function getSessionUserProfile(request: Request) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser || !sessionUser.uid) {
    redirect("/login");
  }

  const uid = sessionUser?.uid as string;

  const docSnapshot = await db.collection("users").doc(uid).get();

  if (!docSnapshot.exists) {
    console.log("User profile not found");
    return null;
  } else {
    const user = docSnapshot.data();
    return user;
  }
}

export async function createUserSession(idToken: string, redirectTo: string) {
  const token = await getSessionToken(idToken);
  const session = await storage.getSession();
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

async function getSessionToken(idToken: string) {
  const decodedToken = await serverAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }

  return serverAuth.createSessionCookie(idToken, { expiresIn: SESSION_EXPIRY });
}

export async function destroySession(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const newCookie = await storage.destroySession(session);

  return redirect("/login", { headers: { "Set-Cookie": newCookie } });
}

export async function signOut(request: Request) {
  return await destroySession(request);
}
