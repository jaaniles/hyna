import {
  App,
  initializeApp,
  getApps,
  cert,
  getApp,
  ServiceAccount,
} from "firebase-admin/app";
import admin from "firebase-admin";
import { Auth, getAuth } from "firebase-admin/auth";

import serviceAccount from "./service-account.json";
import { Firestore } from "firebase-admin/firestore";

export const SESSION_EXPIRY = 60 * 60 * 24 * 14 * 1000;

let app: App;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  db = admin.firestore();

  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth, db };
