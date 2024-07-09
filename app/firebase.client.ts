import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  // @ts-expect-error unable to type this
  apiKey: window.ENV.FIREBASE_API_KEY,
  authDomain: "siasto.firebaseapp.com",
  projectId: "siasto",
  storageBucket: "siasto.appspot.com",
  messagingSenderId: "310893103132",
  appId: "1:310893103132:web:b33eb32b4ae9a7db6937d9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence);

export { auth };
