import { LoaderFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { session } from "~/cookie";
import { auth as serverAuth } from "~/firebase.server";

export const loader: LoaderFunction = async ({ request }) => {
  const jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {
    return redirect("/login");
  }

  try {
    const token = await serverAuth.verifySessionCookie(jwt);

    if (!token) {
      redirect("/login");
    }

    return {
      loggedIn: true,
      user: {
        email: token.email,
        id: token.uid,
      },
    };
  } catch (e) {
    return redirect("/logout");
  }
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
