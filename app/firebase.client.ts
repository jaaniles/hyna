import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

import firebaseConfig from "./firebase-config.json";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence);

export { auth };
