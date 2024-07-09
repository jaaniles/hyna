import { LoaderFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  return {
    user: {
      email: sessionUser.email,
      id: sessionUser.id,
    },
  };
};

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Profile</h1>
      <p>Hello, {user.email}</p>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
