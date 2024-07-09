import { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { SyntheticEvent } from "react";

import { auth } from "~/firebase.client";
import { createUserSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get("idToken")?.toString();

  if (!idToken) {
    return null;
  }

  return createUserSession(idToken, "/");
};

export default function Login() {
  const fetcher = useFetcher();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();

      fetcher.submit({ idToken }, { method: "post", action: "/login" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(onProviderSignIn);
  };

  async function onProviderSignIn(credential: UserCredential) {
    const idToken = await credential.user.getIdToken();
    fetcher.submit({ idToken }, { method: "post", action: "/login" });
  }

  return (
    <div {...stylex.props(styles.root)}>
      <h1>This is login</h1>

      <button onClick={handleGoogleLogin}>Sign in with Google</button>

      <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
        <div>
          <label htmlFor="email">email</label>
          <input
            {...stylex.props(styles.input)}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            {...stylex.props(styles.input)}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button {...stylex.props(styles.submit)} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = stylex.create({
  root: {
    background: "#fbfbfb",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    padding: 64,
  },

  form: {
    width: "100%",
    borderRadius: 8,
  },
  input: {
    width: "100%",
    heigth: 32,
  },

  submit: {
    width: 150,

    background: "white",
    borderRadius: 4,
    border: "2px solid black",
  },
});
