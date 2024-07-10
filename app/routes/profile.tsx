import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { requireUserSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { email, user } = await requireUserSession(request);

  return json({
    email: email,
    username: user.username,
  });
};

export default function Profile() {
  const { email, username } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p>{username}</p>
        <p>{email}</p>
        <Link to="/profile/edit">Edit profile</Link>
      </div>

      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
