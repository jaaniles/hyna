import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";

import { registerUser } from "~/auth/auth";
import { getUserSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userSession = await getUserSession(request);

  const formData = await request.formData();
  const username = formData.get("username") as string;

  console.log("plom?", username);

  if (!username) {
    return null;
  }

  await registerUser({
    request,
    user: {
      uid: userSession?.uid as string,
      username,
    },
  });

  return redirect("/");
};

export default function Register() {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === `/register`;

  return (
    <div>
      <h1>Register form</h1>

      <Form method="post">
        <fieldset disabled={isSubmitting}>
          <label htmlFor="username">username</label>
          <input type="text" id="username" name="username" />
          <button type="submit">
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </fieldset>
      </Form>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
