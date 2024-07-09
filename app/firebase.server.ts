import {
  App,
  initializeApp as initializeAdminApp,
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

let adminApp: App;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  adminApp = initializeAdminApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  db = admin.firestore();
  auth = getAuth(adminApp);
} else {
  adminApp = getApp();

  db = admin.firestore();
  auth = getAuth(adminApp);
}

export { auth, db };
