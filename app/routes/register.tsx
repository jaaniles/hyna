import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { registerUser } from "~/auth/auth";
import { getUserSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userSession = await getUserSession(request);

  if (!userSession || userSession.uid === undefined) {
    redirect("/login");
  }

  const formData = await request.formData();
  const username = formData.get("username") as string;

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
  return (
    <div>
      <h1>Register form</h1>

      <Form method="post">
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" name="username" />
        </div>
        <button type="submit">Register me</button>
      </Form>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
