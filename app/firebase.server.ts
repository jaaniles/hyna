import { App, initializeApp, getApps, cert, getApp, ServiceAccount } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

import serviceAccount from "./service-account.json"

let app: App;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  })

  auth = getAuth(app)
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth}