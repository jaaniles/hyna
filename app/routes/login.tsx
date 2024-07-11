import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { SyntheticEvent, useState } from "react";

import { auth } from "~/firebase.client";
import { createUserSession, getUserSession } from "~/session.server";
import { Button } from "~/ui/button/Button";
import { CreditCard } from "~/ui/CreditCard";
import { EmailField } from "~/ui/fields/EmailField";
import { PasswordField } from "~/ui/fields/PasswordField";
import { Page } from "~/ui/Page";
import { Stack } from "~/ui/Stack";
import { Headline } from "~/ui/typography/Headline";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get("idToken")?.toString();

  if (!idToken) {
    return null;
  }

  return createUserSession(idToken, "/");
};

export const loader: LoaderFunction = async ({ request }) => {
  const userSession = await getUserSession(request);

  return json({
    loggedIn: !!userSession,
  });
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loggedIn } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      setIsSubmitting(false);
      console.log(err);
    }
  };

  const handleEmailChange = (e: SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(onProviderSignIn);
  };

  async function onProviderSignIn(credential: UserCredential) {
    const idToken = await credential.user.getIdToken();
    fetcher.submit({ idToken }, { method: "post", action: "/login" });
  }

  return (
    <Page>
      <Stack spacing={72}>
        <Stack spacing={32}>
          <div>
            <Headline as="h1">Login</Headline>
            {loggedIn && <p>You are already logged in by the way</p>}
          </div>

          <CreditCard user={{ username: email }} />

          <Button
            type="button"
            onClick={handleGoogleLogin}
            text={"Sign in with Google"}
          />
        </Stack>

        <Form onSubmit={handleSubmit}>
          <Stack spacing={8}>
            <div>
              <EmailField
                id="email"
                name="email"
                label="Email"
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <PasswordField label="Password" id="password" name="password" />
            </div>
            <Button
              type="submit"
              text={isSubmitting ? "Submitting.." : "Submit"}
            />
          </Stack>
        </Form>
      </Stack>
    </Page>
  );
}
