import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { tokenUser, user } = await requireUserSession(request);

  return json({
    email: tokenUser.email,
    username: user.username,
  });
};

export default function Profile() {
  const { email, username } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Profile</h1>
      <p>{username}</p>
      <p>{email}</p>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
